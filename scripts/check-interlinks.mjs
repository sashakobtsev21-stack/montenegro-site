#!/usr/bin/env node
/*
 * check-interlinks (DoD CLAUDE «внутренние ссылки: минимум 2 на связанные статьи»).
 *
 * Считает внутренние ссылки в ТЕЛЕ статьи/маршрута (.md, после frontmatter):
 * markdown `](/...)` и raw `<a href="/...">`. Исключает /go/ (партнёрские),
 * якоря (#...), внешние (http). Шаблонные ссылки (хлебные крошки, RelatedPosts,
 * nav/footer) сюда не попадают — это именно авторская перелинковка в тексте.
 *
 * Узкая зона: только articles/ и routes/ (у restaurants/services тела нет — карточки).
 * Draft (draft:true) пропускаем. Порог — 2. По умолчанию WARN (как check-photos
 * для ресторанов): не валит сборку, но печатает список «тонких» по перелинковке.
 * Запуск: node scripts/check-interlinks.mjs            (WARN-режим, exit 0)
 *         node scripts/check-interlinks.mjs --strict    (exit 1 при нарушениях)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src/content';
const COLLECTIONS = ['articles', 'routes'];
const MIN = 2;
const strict = process.argv.includes('--strict');

function walk(dir, acc) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

/** Делит файл на frontmatter и тело. */
function splitFront(src) {
  const m = src.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  return m ? m[1] : src;
}

/** Считает уникальные внутренние ссылки в теле. */
function countInternalLinks(body) {
  const links = new Set();
  const add = (href) => {
    if (!href) return;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean.startsWith('/')) return; // только абсолютные внутренние
    if (clean === '/go' || clean.startsWith('/go/')) return; // партнёрские — не считаем
    if (/\.(webp|avif|png|jpe?g|svg|gif|ico)$/i.test(clean)) return; // картинки — не ссылки
    links.add(clean.replace(/\/+$/, '')); // нормализуем хвостовой слеш
  };
  // markdown [text](/path)
  for (const m of body.matchAll(/\]\((\/[^)\s]*)\)/g)) add(m[1]);
  // raw <a href="/path">
  for (const m of body.matchAll(/<a\b[^>]*\bhref\s*=\s*["'](\/[^"']*)["']/gi)) add(m[1]);
  return links.size;
}

const thin = [];
let count = 0;

for (const col of COLLECTIONS) {
  let files;
  try {
    files = walk(join(ROOT, col), []);
  } catch {
    continue;
  }
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    if (/^draft:\s*true\s*$/m.test(src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '')) continue;
    count++;
    const n = countInternalLinks(splitFront(src));
    if (n < MIN) thin.push({ file: file.replace(/\\/g, '/'), n });
  }
}

if (thin.length) {
  const label = strict ? 'НАРУШЕНИЯ' : 'предупреждение (WARN)';
  console.warn(`[check-interlinks] ${label} — статей с <${MIN} внутр. ссылок: ${thin.length}/${count}`);
  for (const t of thin) console.warn(`  - ${t.file}: ${t.n} внутр. ссыл.`);
  if (strict) process.exit(1);
  console.warn('[check-interlinks] WARN-режим: сборку не валю. Добавьте перелинковку в теле (DoD ≥2).');
} else {
  console.log(`[check-interlinks] OK — у всех ${count} статей/маршрутов ≥${MIN} внутр. ссылок в теле.`);
}
