/*
 * check-parity.mjs — проверка пар ru/uk и SEO-инвариантов контента (SPEC §11/§14).
 * Без зависимостей: лёгкий парс frontmatter. Ловит регрессии, которые astro check
 * не видит: непарные ru/uk, рассинхрон lang↔папка, title > 60 зн., расхождение
 * числовых полей маршрутов (days/distanceKm/budget) между языками.
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
    const langDir = /\/uk\//.test(rel) ? 'uk' : /\/en\//.test(rel) ? 'en' : 'ru';
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
  // ru+uk обязательны; en — опционален (3-й язык, раскатывается батчами).
  // Любой присутствующий перевод сверяется с ru: slug, razvlType, числа маршрутов.
  for (const [key, byLang] of pairs) {
    if (!byLang.ru) errors.push(`${key}: нет ru-версии`);
    if (!byLang.uk) errors.push(`${key}: нет uk-версии`);
    if (!byLang.ru) continue;
    for (const lng of ['uk', 'en']) {
      const v = byLang[lng];
      if (!v) continue; // en необязателен — пропускаем, если перевода ещё нет
      if (v.slug !== byLang.ru.slug) {
        errors.push(`${key}: slug ru='${byLang.ru.slug}' ≠ ${lng}='${v.slug}'`);
      }
      if (v.razvlType !== byLang.ru.razvlType) {
        errors.push(`${key}: razvlType ru='${byLang.ru.razvlType}' ≠ ${lng}='${v.razvlType}'`);
      }
      if (col === 'routes') {
        for (const f of ['days', 'distanceKm', 'budgetAmount', 'budgetCurrency']) {
          if (v[f] !== byLang.ru[f]) {
            errors.push(`${key}: ${f} ru='${byLang.ru[f]}' ≠ ${lng}='${v[f]}'`);
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
console.log(`[check-parity] OK — ${fileCount} файлов; ru/uk обязательны, en опционален; slug/lang/razvlType, title ≤${TITLE_MAX}, числа маршрутов в норме.`);
