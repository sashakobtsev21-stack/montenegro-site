// Скаффолдер контента Georgia Guidebook (ROADMAP #20b).
// Генерирует ТРИ языковые версии (ru/uk/en) скелета с корректным по
// content.config.ts frontmatter + папку фото public/images/<slug>/ + .gitkeep.
//
// Использование:
//   node scripts/new-content.mjs <type> <slug> [--title "Заголовок"] [--city Тбилиси]
//   type: article | news | route | restaurant | service | city
//
// Что делает:
//   • пишет src/content/<коллекция>/{ru,uk,en}/<slug>.md (если файла нет — не перезатирает);
//   • ставит draft: true (скелет не попадает в сборку, пока его не доведут);
//   • вшивает per-type DoD-чеклист комментарием + TODO-маркеры по правилу 4 (факты не выдумывать);
//   • поле cover ОБЯЗАТЕЛЬНО (правило «фото у всего контента») — оставлено TODO,
//     check-photos потребует реальный webp ≤200КБ при снятии draft.
//
// Скелет НЕ публикует контент и НЕ выдумывает факты — только каркас под заполнение.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname } from 'node:path';

const LANGS = ['ru', 'uk', 'en'];

const ARTICLE_CATEGORIES = [
  'dostoprimechatelnosti',
  'goroda',
  'eda',
  'razvlecheniya',
  'marshruty',
  'transport',
  'arenda-avto',
  'relokatsiya',
  'strahovka',
  'novosti',
];

// --- argv --------------------------------------------------------------
const [, , type, slug, ...rest] = process.argv;
const opts = {};
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) opts[rest[i].slice(2)] = rest[i + 1] ?? '';
}

if (!type || !slug) {
  console.error(
    'Usage: node scripts/new-content.mjs <article|news|route|restaurant|service|city> <slug> [--title "..."] [--city "..."]',
  );
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`✗ slug «${slug}» — только строчные латиница/цифры/дефис (URL стабильны, правило 3).`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (Node — Date доступен)
const title = opts.title || 'TODO: заголовок';
const city = opts.city || 'TODO: город';

// per-type DoD-чеклист (ROADMAP #20a) — вшивается комментарием в каждый скелет.
const DOD = {
  article: [
    'пара ru+uk на месте (en — по возможности), одинаковый slug;',
    'cover (CC: автор+лицензия в coverCredit, ИЛИ своё фото) + ≥3 инлайн-figure ИЛИ ≥6 gallery — фото ОБЯЗАТЕЛЬНЫ;',
    'факты только из briefs/<slug>.md или надёжного источника (sources); нет данных → TODO, не выдумывать (правило 4);',
    'visit (цена/часы) — только с источником + checkedAt + «уточняйте»; иначе не указывать;',
    '≥2 внутренние ссылки на связанные статьи; хаб раздела ссылается сюда;',
    'title ≤60, description ≤155, взаимные hreflang ru↔uk↔en, schema.org проходит Rich Results Test;',
    '1–3 AffiliateBox через /go/{partner}?c=<slug> (rel sponsored nofollow noopener);',
    'build+check+test+test:links зелёные; затем снять draft.',
  ],
  route: [
    'cover ОБЯЗАТЕЛЕН (карточка + OG); days/distanceKm/budgetFrom/stops заполнены;',
    'после заполнения stops — обновить геометрию: node scripts/build-route-geometry.mjs;',
    '+ остальное как у article (фото, факты, ссылки, SEO, гейты).',
  ],
  restaurant: [
    'отбор по консенсусу >4★ из НЕСКОЛЬКИХ источников (sources) + наш ratingNote/review своими словами (чужие отзывы дословно нельзя, §15);',
    'cover (своё/CC/с разрешения заведения, coverCredit для CC) — фото ОБЯЗАТЕЛЬНО;',
    'geo.coord + mapUrl; hours/dishes — только из надёжного источника, иначе не указывать;',
    'verifiedAt = дата проверки; build+test зелёные; снять draft.',
  ],
  service: [
    'cover опц. (директория услуг рендерит текст-карточку); name/summary/rubric/city;',
    'url/contact — реальные данные партнёра (без example.com); sponsored=true только для платного места (золотая рамка);',
    'demo:true только для честного примера-образца (бейдж «Пример», noindex).',
  ],
  city: [
    'name/region/coord/summary; cover (CC/своё) — фото ОБЯЗАТЕЛЬНО;',
    'связать с статьёй-путеводителем (article: reference) при наличии.',
  ],
};
DOD.news = DOD.article;

const dodComment = (t) =>
  `<!-- DoD (${t}); снять draft только когда всё ✔:\n` +
  (DOD[t] || DOD.article).map((l) => `  - [ ] ${l}`).join('\n') +
  `\n  Полный конвейер — CLAUDE.md «Контент-конвейер» + «Definition of Done». -->`;

// --- шаблоны frontmatter по типам --------------------------------------
const coverBlock = `cover:
  src: '/images/${slug}/cover.webp' # TODO: положить реальный webp ≤200КБ (scripts/build-gallery.mjs)
  alt: 'TODO: описание обложки'
coverCredit: 'TODO: Фото — автор / лицензия (для CC/чужого фото обязательно)'`;

function articleBody(lang, category) {
  const intro =
    lang === 'ru'
      ? 'TODO: вводный абзац — живо и по делу, без выдуманных фактов.'
      : lang === 'uk'
        ? 'TODO: вступний абзац — жваво й по суті, без вигаданих фактів.'
        : 'TODO: intro paragraph — lively and to the point, no invented facts.';
  return `${dodComment(category === 'novosti' ? 'news' : 'route' === category ? 'route' : type)}\n\n${intro}\n`;
}

function buildArticle(lang, { category }) {
  return `---
title: '${title}'
description: 'TODO: описание ≤155 символов'
slug: '${slug}'
lang: '${lang}'
category: '${category}'
publishedAt: ${today}
updatedAt: ${today}
${coverBlock}
gallery: []
affiliate: []
sources: []
draft: true
---

${articleBody(lang, category)}`;
}

function buildRoute(lang) {
  return `---
title: '${title}'
description: 'TODO: описание ≤155 символов'
slug: '${slug}'
lang: '${lang}'
category: 'marshruty'
publishedAt: ${today}
updatedAt: ${today}
${coverBlock}
days: 1
distanceKm: 1
budgetFrom:
  amount: 0
  currency: 'GEL'
stops: [] # TODO: заполнить остановки (name/km/coord), затем build-route-geometry.mjs
bestSeason: []
gallery: []
affiliate: []
sources: []
draft: true
---

${dodComment('route')}

TODO: описание маршрута.
`;
}

function buildRestaurant(lang) {
  return `---
name: '${title}'
slug: '${slug}'
lang: '${lang}'
city: '${city}'
district: ''
cuisine: ''
priceLevel: '₾₾'
geo:
  coord: [0, 0] # TODO: реальные координаты
  address: 'TODO'
mapUrl: 'https://maps.google.com/?q=TODO'
ratingNote: 'TODO: наш вывод об отборе своими словами (чужие отзывы дословно нельзя, §15)'
sources: []
summary: 'TODO: краткое описание'
verifiedAt: ${today}
${coverBlock}
draft: true
---

${dodComment('restaurant')}
`;
}

function buildService(lang) {
  return `---
name: '${title}'
slug: '${slug}'
lang: '${lang}'
rubric: 'zhilyo-rieltory' # TODO: zhilyo-rieltory|klining|pereezd|remont|dokumenty|perevodchiki
city: '${city}'
summary: 'TODO: краткое описание услуги'
tags: []
sponsored: false
demo: false
draft: true
---

${dodComment('service')}
`;
}

function buildCity(lang) {
  return `---
name: '${title}'
region: 'TODO'
coord: [0, 0]
lang: '${lang}'
slug: '${slug}'
summary: 'TODO: краткое описание города ≤200'
${coverBlock}
---

${dodComment('city')}
`;
}

const PLAN = {
  article: { coll: 'articles', build: (l) => buildArticle(l, { category: opts.category || 'dostoprimechatelnosti' }) },
  news: { coll: 'articles', build: (l) => buildArticle(l, { category: 'novosti' }) },
  route: { coll: 'routes', build: buildRoute },
  restaurant: { coll: 'restaurants', build: buildRestaurant },
  service: { coll: 'services', build: buildService },
  city: { coll: 'cities', build: buildCity },
};

const plan = PLAN[type];
if (!plan) {
  console.error(`✗ неизвестный тип «${type}». Допустимо: ${Object.keys(PLAN).join(', ')}`);
  process.exit(1);
}
if (type === 'article' && opts.category && !ARTICLE_CATEGORIES.includes(opts.category)) {
  console.error(`✗ category «${opts.category}» не из набора: ${ARTICLE_CATEGORIES.join(', ')}`);
  process.exit(1);
}

const exists = async (p) => {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

// --- генерация ---------------------------------------------------------
let created = 0;
let skipped = 0;
for (const lang of LANGS) {
  const path = `src/content/${plan.coll}/${lang}/${slug}.md`;
  if (await exists(path)) {
    console.log(`• пропуск (уже есть): ${path}`);
    skipped++;
    continue;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, plan.build(lang), 'utf8');
  console.log(`✓ создан: ${path}`);
  created++;
}

// папка фото + .gitkeep (cities/services фото опц., но папку готовим всегда)
const imgDir = `public/images/${slug}`;
await mkdir(imgDir, { recursive: true });
const gk = `${imgDir}/.gitkeep`;
if (!(await exists(gk))) await writeFile(gk, '', 'utf8');

console.log(
  `\nГотово: ${created} файл(ов) создано, ${skipped} пропущено. Папка фото: ${imgDir}/\n` +
    `Дальше: брифы/факты → текст → фото (scripts/commons-candidates + build-gallery) →\n` +
    `переводы (uk/en) → fact-check → content-editor → гейты (build/check/test/test:links) → снять draft.`,
);
