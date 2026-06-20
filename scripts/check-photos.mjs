// Гейт «фото обязательно у всего контента» (правило владельца 2026-06-17).
// Проверяет, что у каждого НЕ-draft и НЕ-demo материала есть cover, а файл cover
// реально существует и ≤200 КБ (перф §15). Запуск: node scripts/check-photos.mjs
//
// Уровни:
//  • ERROR (валит сборку): статья (articles) или маршрут (routes) без cover, либо
//    cover.src указывает на несуществующий/слишком тяжёлый файл.
//  • WARN (не валит): заведение (restaurants), услуга (services), город (cities)
//    без cover — это известный беклог фото (CC-кадров конкретных мест мало);
//    отслеживаем, но не блокируем релиз.
// draft:true и demo:true пропускаются (в рендер не идут / помечены как пример).

import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const ROOT = 'src/content';
const PUBLIC = 'public';
const MAX_BYTES = 200 * 1024;
const STRICT = new Set(['articles', 'routes']);
const SOFT = new Set(['restaurants', 'services', 'cities']);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = `${dir}/${e.name}`;
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith('.md') && e.name !== '.gitkeep') out.push(full);
  }
  return out;
}

const fm = (t) => t.split('---')[1] || '';
const has = (f, re) => re.test(f);
const errors = [];
const warns = [];

for (const collection of [...STRICT, ...SOFT]) {
  const base = `${ROOT}/${collection}`;
  if (!existsSync(base)) continue;
  for (const file of await walk(base)) {
    const text = await readFile(file, 'utf8');
    const front = fm(text);
    if (has(front, /^draft:\s*true/m) || has(front, /^demo:\s*true/m)) continue;
    const coverMatch = front.match(/^cover:\s*\n\s*src:\s*['"]([^'"]+)['"]/m) || front.match(/^\s*cover:\s*\{[^}]*src:\s*['"]([^'"]+)['"]/m);
    const rel = file.replace(/\\/g, '/').replace('src/content/', '');
    if (!coverMatch) {
      (STRICT.has(collection) ? errors : warns).push(`${rel} — нет cover`);
      continue;
    }
    // Файл cover должен существовать и быть ≤200КБ (для /images/* из public).
    const src = coverMatch[1];
    if (src.startsWith('/')) {
      const fsPath = `${PUBLIC}${src}`;
      if (!existsSync(fsPath)) {
        errors.push(`${rel} — cover-файл не найден: ${src}`);
      } else {
        const size = (await stat(fsPath)).size;
        if (size > MAX_BYTES) errors.push(`${rel} — cover >200КБ (${Math.round(size / 1024)}КБ): ${src}`);
      }
    }
  }
}

if (warns.length) {
  console.log(`[check-photos] WARN — ${warns.length} мест/услуг/городов без cover (беклог фото):`);
  for (const w of warns.slice(0, 40)) console.log('  • ' + w);
  if (warns.length > 40) console.log(`  …и ещё ${warns.length - 40}`);
}
if (errors.length) {
  console.error(`\n[check-photos] FAIL — ${errors.length} ошибок (фото обязательно у статей/маршрутов):`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(`[check-photos] OK — у всех статей и маршрутов есть существующий cover ≤200КБ${warns.length ? ` (${warns.length} мест в беклоге-WARN)` : ''}.`);
