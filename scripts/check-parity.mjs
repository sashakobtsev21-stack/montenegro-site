/*
 * check-parity.mjs — проверка пар en/ru и SEO-инвариантов контента (SPEC §11/§14).
 * Без зависимостей: лёгкий парс frontmatter. Ловит регрессии, которые astro check
 * не видит: непарные en/ru, рассинхрон lang↔папка, title > 60 зн., расхождение
 * числовых полей маршрутов (days/distanceKm/budget) между языками.
 * en — ведущий язык (корень), ru — обязательный перевод (uk удалён 2026-06-22).
 *
 * Запуск: node scripts/check-parity.mjs  (exit 1 при нарушениях).
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const COLLECTIONS = ['articles', 'routes', 'restaurants', 'services'];
const ROOT = 'src/content';
const TITLE_MAX = 60;

const errors = [];

/** Все .md файлы коллекции с разбивкой по языку и имени файла. */
function walk(dir, acc) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith('.md') || name.endsWith('.mdx')) acc.push(p);
  }
  return acc;
}

/** Минимальный парс верхнего frontmatter-блока в плоскую карту нужных ключей. */
function parseFront(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = m[1];
  const pick = (key) => {
    const r = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!r) return undefined;
    return r[1].trim().replace(/^['"]|['"]$/g, '');
  };
  // budgetFrom вложенный — берём amount/currency из всего блока frontmatter.
  const amount = fm.match(/amount:\s*(\d+)/);
  const currency = fm.match(/currency:\s*['"]?([A-Za-z]+)/);
  return {
    lang: pick('lang'),
    slug: pick('slug'),
    title: pick('title'),
    category: pick('category'),
    razvlType: pick('razvlType'),
    days: pick('days'),
    distanceKm: pick('distanceKm'),
    budgetAmount: amount ? amount[1] : undefined,
    budgetCurrency: currency ? currency[1] : undefined,
  };
}

let fileCount = 0;
for (const col of COLLECTIONS) {
  const base = join(ROOT, col);
  let files;
  try {
    files = walk(base, []);
  } catch {
    continue; // коллекции может не быть
  }
  /** key = имя файла (пара ru/uk = одинаковое имя в ru/ и uk/). */
  const pairs = new Map();
  for (const file of files) {
    fileCount++;
    const rel = file.replace(/\\/g, '/');
    const langDir = /\/ru\//.test(rel) ? 'ru' : 'en';
    const fname = rel.split('/').pop();
    const data = parseFront(readFileSync(file, 'utf8'));
    if (!data) {
      errors.push(`${rel}: нет frontmatter`);
      continue;
    }
    // lang в frontmatter должен совпадать с папкой.
    if (data.lang && data.lang !== langDir) {
      errors.push(`${rel}: lang='${data.lang}', а файл в папке /${langDir}/`);
    }
    // title ≤ 60 (articles/routes; у restaurants title нет).
    if (data.title && [...data.title].length > TITLE_MAX) {
      errors.push(`${rel}: title ${[...data.title].length} зн. > ${TITLE_MAX} — «${data.title}»`);
    }
    const key = `${col}/${fname}`;
    if (!pairs.has(key)) pairs.set(key, {});
    pairs.get(key)[langDir] = data;
  }
  // en+ru обязательны (en — ведущий язык на корне, ru — обязательный перевод).
  // Перевод ru сверяется с en: slug, razvlType, числа маршрутов.
  for (const [key, byLang] of pairs) {
    if (!byLang.en) errors.push(`${key}: нет en-версии`);
    if (!byLang.ru) errors.push(`${key}: нет ru-версии`);
    if (!byLang.en) continue;
    for (const lng of ['ru']) {
      const v = byLang[lng];
      if (!v) continue;
      if (v.slug !== byLang.en.slug) {
        errors.push(`${key}: slug en='${byLang.en.slug}' ≠ ${lng}='${v.slug}'`);
      }
      if (v.razvlType !== byLang.en.razvlType) {
        errors.push(`${key}: razvlType en='${byLang.en.razvlType}' ≠ ${lng}='${v.razvlType}'`);
      }
      if (col === 'routes') {
        for (const f of ['days', 'distanceKm', 'budgetAmount', 'budgetCurrency']) {
          if (v[f] !== byLang.en[f]) {
            errors.push(`${key}: ${f} en='${byLang.en[f]}' ≠ ${lng}='${v[f]}'`);
          }
        }
      }
    }
  }
}

if (errors.length) {
  console.error(`[check-parity] НАРУШЕНИЯ (${errors.length}):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`[check-parity] OK — ${fileCount} файлов; en/ru обязательны; slug/lang/razvlType, title ≤${TITLE_MAX}, числа маршрутов в норме.`);
