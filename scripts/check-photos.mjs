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
//
// RATCHET (2026-06-30, гейт #2 — минимум фото на материал): помимо обложки
// считаем ИНЛАЙН-изображения в теле (cover + gallery[] + <figure>/<img>/markdown
// `![` + photo каждой остановки маршрута) и требуем минимум:
//   • статья (category НЕ novosti/news)  → ≥5 изображений всего (cover + остальные);
//   • новость (category novosti/news)     → ≥2;
//   • маршрут (routes)                    → cover + ≥1 фото на каждую остановку,
//     если остановки определяются; иначе ≥5 всего.
// Нарушившие сейчас слаги перечислены в scripts/.photo-baseline.json
// (grandfathered — чтобы текущий репозиторий проходил). НОВЫЕ материалы (не в
// бейслайне) обязаны набирать минимум, иначе FAIL (ненулевой выход).

import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';

const ROOT = 'src/content';
const PUBLIC = 'public';
const MAX_BYTES = 200 * 1024;
const STRICT = new Set(['articles', 'routes']);
const SOFT = new Set(['restaurants', 'services', 'cities']);
const NEWS_CATEGORIES = new Set(['novosti', 'news']);
const MIN_ARTICLE = 5;
const MIN_NEWS = 2;
const MIN_ROUTE_FALLBACK = 5;
const BASELINE_PATH = 'scripts/.photo-baseline.json';

// Бейслайн: массив слагов (или relpath) материалов, которым на момент введения
// гейта не хватало фото. Эти материалы НЕ валят сборку (legacy), но остаются в
// списке на бэкфилл. Любой материал НЕ из бейслайна обязан соответствовать минимуму.
let BASELINE = new Set();
if (existsSync(BASELINE_PATH)) {
  try {
    const arr = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
    if (Array.isArray(arr)) BASELINE = new Set(arr);
  } catch {
    /* битый бейслайн трактуем как пустой */
  }
}

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
const bodyOf = (t) => {
  const parts = t.split('---');
  return parts.length >= 3 ? parts.slice(2).join('---') : '';
};
const has = (f, re) => re.test(f);

// Извлечь slug из frontmatter (для сверки с бейслайном).
function slugOf(front, file) {
  const m = front.match(/^slug:\s*['"]?([^'"\n]+)['"]?/m);
  if (m) return m[1].trim();
  return file
    .replace(/\\/g, '/')
    .replace(/.*\//, '')
    .replace(/\.md$/, '');
}

// Сколько изображений всего: cover + gallery[] + inline <img>/markdown + photo остановок.
function countImages(front, body) {
  let cover = 0;
  if (
    front.match(/^cover:\s*\n\s*src:\s*['"]([^'"]+)['"]/m) ||
    front.match(/^\s*cover:\s*\{[^}]*src:\s*['"]([^'"]+)['"]/m)
  ) {
    cover = 1;
  }

  // gallery[] — считаем "src:" внутри блока gallery: (до следующего top-level ключа).
  // routes: stops[].photo.src — отдельно (фото остановок).
  let gallery = 0;
  let stopPhotos = 0;
  const lines = front.split('\n');
  let inGallery = false;
  let inStops = false;
  for (const ln of lines) {
    if (/^gallery:\s*(\[\s*\])?\s*$/.test(ln)) {
      inGallery = /^gallery:\s*$/.test(ln); // "gallery: []" — пусто
      inStops = false;
      continue;
    }
    if (/^stops:\s*$/.test(ln)) {
      inStops = true;
      inGallery = false;
      continue;
    }
    if (/^\S/.test(ln)) {
      // новый top-level ключ — выходим из блоков
      inGallery = false;
      inStops = false;
      continue;
    }
    if (inGallery && /^\s+-?\s*src:\s*['"]/.test(ln)) gallery++;
    if (inStops && /^\s+src:\s*['"]/.test(ln)) stopPhotos++;
  }

  const inlineImg = (body.match(/<img\s/gi) || []).length;
  const mdImg = (body.match(/!\[[^\]]*\]\(/g) || []).length;

  return {
    cover,
    gallery,
    inlineImg,
    mdImg,
    stopPhotos,
    total: cover + gallery + inlineImg + mdImg + stopPhotos,
  };
}

// Число остановок маршрута (для правила «cover + ≥1 фото на остановку»).
function countStops(front) {
  const m = front.match(/^stops:\s*\n([\s\S]*?)(?=^\S|$)/m);
  if (!m) return 0;
  return (m[1].match(/^\s+-\s+name:/gm) || []).length;
}

const errors = [];
const warns = [];
const baselineHit = []; // legacy-материалы, не дотянувшие до минимума (для отчёта)

for (const collection of [...STRICT, ...SOFT]) {
  const base = `${ROOT}/${collection}`;
  if (!existsSync(base)) continue;
  for (const file of await walk(base)) {
    const text = await readFile(file, 'utf8');
    const front = fm(text);
    if (has(front, /^draft:\s*true/m) || has(front, /^demo:\s*true/m)) continue;
    const coverMatch =
      front.match(/^cover:\s*\n\s*src:\s*['"]([^'"]+)['"]/m) ||
      front.match(/^\s*cover:\s*\{[^}]*src:\s*['"]([^'"]+)['"]/m);
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

    // RATCHET: минимум фото на материал — только для STRICT-коллекций
    // (articles/routes; у restaurants/services/cities тела нет — это карточки).
    if (!STRICT.has(collection)) continue;

    const body = bodyOf(text);
    const n = countImages(front, body);
    const slug = slugOf(front, file);
    const catM = front.match(/^category:\s*['"]?([\w-]+)/m);
    const cat = catM ? catM[1] : '';
    const isNews = NEWS_CATEGORIES.has(cat);

    let violation = null;
    if (collection === 'routes') {
      const stops = countStops(front);
      if (stops > 0) {
        // cover + ≥1 фото на остановку (фото остановок + обложка достаточно).
        if (n.cover < 1) violation = `маршрут без cover`;
        else if (n.stopPhotos < stops)
          violation = `у маршрута ${stops} остановок, но фото остановок ${n.stopPhotos} (нужно по фото на каждую)`;
      } else if (n.total < MIN_ROUTE_FALLBACK) {
        violation = `маршрут: фото ${n.total} из ${MIN_ROUTE_FALLBACK}`;
      }
    } else {
      const min = isNews ? MIN_NEWS : MIN_ARTICLE;
      if (n.total < min)
        violation = `${isNews ? 'новость' : 'статья'}: фото ${n.total} из ${min} (cover ${n.cover} + gallery ${n.gallery} + inline ${n.inlineImg + n.mdImg})`;
    }

    if (violation) {
      if (BASELINE.has(slug) || BASELINE.has(rel)) {
        baselineHit.push(`${rel} — ${violation}`);
      } else {
        errors.push(`${rel} — ${violation}`);
      }
    }
  }
}

if (warns.length) {
  console.log(`[check-photos] WARN — ${warns.length} мест/услуг/городов без cover (беклог фото):`);
  for (const w of warns.slice(0, 40)) console.log('  • ' + w);
  if (warns.length > 40) console.log(`  …и ещё ${warns.length - 40}`);
}
if (baselineHit.length) {
  console.log(
    `[check-photos] BASELINE — ${baselineHit.length} legacy-материалов под минимумом фото (бэкфилл, не валят сборку):`,
  );
  for (const b of baselineHit.slice(0, 40)) console.log('  ~ ' + b);
  if (baselineHit.length > 40) console.log(`  …и ещё ${baselineHit.length - 40}`);
}
if (errors.length) {
  console.error(`\n[check-photos] FAIL — ${errors.length} ошибок (фото обязательно у статей/маршрутов):`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(
  `[check-photos] OK — у всех статей и маршрутов есть существующий cover ≤200КБ и достаточно фото${warns.length ? ` (${warns.length} мест в беклоге-WARN)` : ''}${baselineHit.length ? ` (${baselineHit.length} legacy в бейслайне)` : ''}.`,
);
