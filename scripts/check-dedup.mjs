#!/usr/bin/env node
/*
 * check-dedup (RATCHET 2026-06-30, гейт #3 — анти-каннибализация).
 *
 * Ловит три класса дублей по корпусу контента (.md), чтобы новый материал не
 * каннибализировал существующий и не плодил почти-копии под один интент:
 *
 *  (a) ТОЧНЫЕ коллизии slug внутри одной категории → ЖЁСТКИЙ FAIL (без бейслайна;
 *      их быть не должно — это сломанная маршрутизация/дубль файла).
 *  (b) ОБРАТНЫЕ транспортные пары — есть и `X-to-Y`, и `Y-to-X` как отдельные
 *      статьи → FAIL, если пара не в бейслайне.
 *  (c) ПОЧТИ-ДУБЛИ заголовков — нормализованное равенство (lowercase, без
 *      пунктуации/стоп-слов) ИЛИ token-Jaccard ≥ 0.85 между двумя статьями →
 *      FAIL, если пара не в бейслайне.
 *
 * Бейслайн scripts/.dedup-baseline.json фиксирует уже принятые пересечения
 * (reversePairs + titlePairs), чтобы текущий репозиторий проходил. Slug-коллизии
 * (a) НЕ бейслайнятся.
 *
 * Анализируем ОДИН язык (en по умолчанию, иначе первый существующий из ru/uk),
 * чтобы тройки ru/uk/en одной статьи не считались дублями между собой.
 * draft:true / demo:true пропускаются. Запуск: node scripts/check-dedup.mjs
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';

const ROOT = 'src/content';
const COLLECTIONS = ['articles', 'routes', 'restaurants', 'services', 'cities'];
const LANG_PREF = ['en', 'ru', 'uk'];
const JACCARD_MIN = 0.85;
const BASELINE_PATH = 'scripts/.dedup-baseline.json';

// Бейслайн: { reversePairs: ["a|b", ...], titlePairs: ["slugA|slugB", ...] }.
// Ключи пар — отсортированные слаги через "|" (порядок-независимо).
let BASELINE = { reversePairs: new Set(), titlePairs: new Set() };
if (existsSync(BASELINE_PATH)) {
  try {
    const raw = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
    BASELINE = {
      reversePairs: new Set(Array.isArray(raw.reversePairs) ? raw.reversePairs : []),
      titlePairs: new Set(Array.isArray(raw.titlePairs) ? raw.titlePairs : []),
    };
  } catch {
    /* битый бейслайн — пустой */
  }
}

const pairKey = (a, b) => [a, b].sort().join('|');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = `${dir}/${e.name}`;
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith('.md') && e.name !== '.gitkeep') out.push(full);
  }
  return out;
}

const fmOf = (t) => t.split('---')[1] || '';
const field = (front, name) => {
  const m = front.match(new RegExp(`^${name}:\\s*['"]?([^'"\\n]+)['"]?`, 'm'));
  return m ? m[1].trim() : '';
};

// Какой язык анализируем: первый из LANG_PREF, у которого есть хоть одна папка.
function pickLang() {
  for (const l of LANG_PREF) {
    for (const c of COLLECTIONS) {
      if (existsSync(`${ROOT}/${c}/${l}`)) return l;
    }
  }
  return 'en';
}

const STOP = new Set([
  'the', 'a', 'an', 'of', 'to', 'in', 'on', 'and', 'or', 'for', 'with', 'from', 'by', 'at',
  'what', 'where', 'how', 'see', 'your', 'this', 'it', 'is', 'do', 'go', 'i', 'am', 'best', 'guide',
  // ru/uk стоп-слова (на случай анализа ru/uk-корпуса форка)
  'и', 'в', 'на', 'по', 'из', 'до', 'от', 'что', 'как', 'где', 'для', 'с', 'у', 'о', 'за',
]);
function normTokens(t) {
  return t
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));
}
function jaccard(a, b) {
  const A = new Set(a);
  const B = new Set(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

async function main() {
  const LANG = pickLang();
  const items = [];
  for (const coll of COLLECTIONS) {
    const base = `${ROOT}/${coll}/${LANG}`;
    if (!existsSync(base)) continue;
    for (const f of await walk(base)) {
      const text = await readFile(f, 'utf8');
      const front = fmOf(text);
      if (/^draft:\s*true/m.test(front) || /^demo:\s*true/m.test(front)) continue;
      const slug =
        field(front, 'slug') ||
        f.replace(/\\/g, '/').replace(/.*\//, '').replace(/\.md$/, '');
      const category = field(front, 'category') || coll;
      const title = field(front, 'title');
      items.push({ coll, slug, category, title, rel: f.replace(/\\/g, '/').replace('src/content/', '') });
    }
  }

  const hardErrors = [];
  const errors = [];
  const grandfathered = [];

  // (a) точные slug-коллизии внутри категории — жёстко, без бейслайна.
  const byCatSlug = new Map();
  for (const it of items) {
    const k = `${it.category}::${it.slug}`;
    if (!byCatSlug.has(k)) byCatSlug.set(k, []);
    byCatSlug.get(k).push(it.rel);
  }
  for (const [k, arr] of byCatSlug) {
    if (arr.length > 1) hardErrors.push(`slug-коллизия в категории: ${k} → ${arr.join(', ')}`);
  }

  // (b) обратные транспортные пары X-to-Y / Y-to-X (joiners: to/do/iz/ot).
  const slugSet = new Set(items.map((it) => it.slug));
  const seenPairs = new Set();
  for (const it of items) {
    const m = it.slug.match(/^(.+?)-(?:to|do|iz|ot)-(.+)$/);
    if (!m) continue;
    const [, x, y] = m;
    for (const joiner of ['to', 'do', 'iz', 'ot']) {
      const rev = `${y}-${joiner}-${x}`;
      if (rev === it.slug || !slugSet.has(rev)) continue;
      const key = pairKey(it.slug, rev);
      if (seenPairs.has(key)) continue;
      seenPairs.add(key);
      if (BASELINE.reversePairs.has(key)) grandfathered.push(`обратная пара (baseline): ${key}`);
      else errors.push(`обратная транспортная пара: ${it.slug}  <->  ${rev}`);
    }
  }

  // (c) почти-дубли заголовков.
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const ti = normTokens(items[i].title);
      const tj = normTokens(items[j].title);
      if (!ti.length || !tj.length) continue;
      const eq = ti.join(' ') === tj.join(' ');
      const jac = jaccard(ti, tj);
      if (!eq && jac < JACCARD_MIN) continue;
      const key = pairKey(items[i].slug, items[j].slug);
      if (BASELINE.titlePairs.has(key)) {
        grandfathered.push(`почти-дубль заголовка (baseline): ${key} [${jac.toFixed(2)}]`);
      } else {
        errors.push(
          `почти-дубль заголовка [${eq ? '=' : jac.toFixed(2)}]: ${items[i].slug} «${items[i].title}»  ~~  ${items[j].slug} «${items[j].title}»`,
        );
      }
    }
  }

  console.log(`[check-dedup] язык анализа: ${LANG}; материалов: ${items.length}`);
  if (grandfathered.length) {
    console.log(`[check-dedup] BASELINE — ${grandfathered.length} принятых пересечений (бэкфилл):`);
    for (const g of grandfathered) console.log('  ~ ' + g);
  }

  if (hardErrors.length || errors.length) {
    if (hardErrors.length) {
      console.error(`\n[check-dedup] HARD FAIL — ${hardErrors.length} slug-коллизий (бейслайн недопустим):`);
      for (const e of hardErrors) console.error('  ✗ ' + e);
    }
    if (errors.length) {
      console.error(`\n[check-dedup] FAIL — ${errors.length} дублей (добавьте в .dedup-baseline.json только осознанно):`);
      for (const e of errors) console.error('  ✗ ' + e);
    }
    process.exit(1);
  }

  console.log(
    `[check-dedup] OK — нет slug-коллизий, обратных пар и почти-дублей заголовков${grandfathered.length ? ` (${grandfathered.length} в бейслайне)` : ''}.`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error('[check-dedup] ошибка:', err);
  process.exit(1);
});
