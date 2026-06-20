#!/usr/bin/env node
/*
 * build-cover-variants (аудит 2026-06-17, P0-2 perf): адаптивные обложки без полной
 * миграции в astro:assets. Для каждого cover.src (public/images/*.webp, шире цели)
 * генерирует уменьшенные -640/-960 webp РЯДОМ с оригиналом и пишет манифест
 * src/data/cover-variants.json { "/images/x.webp": "srcset-строка" }.
 *
 * Зачем: обложка статьи = LCP-элемент (eager/fetchpriority=high); на мобайле раньше
 * грузился полный 1280px. srcset отдаёт 640/960 на узкие экраны → ниже LCP-байты.
 *
 * Запуск: node scripts/build-cover-variants.mjs (локально перед коммитом обложек).
 * Варианты и манифест КОММИТЯТСЯ (Cloudflare собирает из чистого репо без sharp).
 * Идемпотентно: пропускает уже свежие варианты. Не в манифесте → компонент отдаёт
 * обычный src (graceful), поэтому новые обложки без прогона не ломаются.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const WIDTHS = [640, 960];
const PUBLIC = 'public';
const CONTENT = 'src/content';
const MANIFEST = 'src/data/cover-variants.json';

/** Собрать все cover.src из frontmatter (.md). */
const covers = new Set();
/** @param {string} dir */
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) {
      const fm = readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const m = fm.match(/\bcover:\s*\r?\n\s*src:\s*['"]?([^'"\n]+)/);
      if (m) covers.add(m[1].trim());
    }
  }
}
walk(CONTENT);

const manifest = {};
let made = 0;
for (const src of [...covers].sort()) {
  if (!src.startsWith('/images/') || !src.endsWith('.webp')) continue;
  const abs = join(PUBLIC, src);
  if (!existsSync(abs)) continue;
  const origW = (await sharp(abs).metadata()).width ?? 0;
  const parts = [];
  for (const w of WIDTHS) {
    if (origW > w + 50) {
      const variantSrc = src.replace(/\.webp$/, `-${w}.webp`);
      const variantAbs = join(PUBLIC, variantSrc);
      const stale =
        !existsSync(variantAbs) || statSync(variantAbs).mtimeMs < statSync(abs).mtimeMs;
      if (stale) {
        await sharp(abs).resize({ width: w }).webp({ quality: 72 }).toFile(variantAbs);
        made++;
      }
      parts.push(`${variantSrc} ${w}w`);
    }
  }
  if (parts.length) {
    parts.push(`${src} ${origW}w`);
    manifest[src] = parts.join(', ');
  }
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(
  `[cover-variants] обложек найдено: ${covers.size}; вариантов создано: ${made}; в манифесте: ${Object.keys(manifest).length}`,
);
