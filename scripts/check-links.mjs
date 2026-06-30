#!/usr/bin/env node
/**
 * test:links (SPEC §21, CLAUDE) — проверка внутренних ссылок и /go/-редиректов.
 *
 * R1: рабочий мини-чекер (не заглушка). После `npm run build`:
 *  1. Собирает все internal href из dist/**\/*.html.
 *  2. Проверяет, что каждый внутренний путь резолвится в существующий
 *     dist/<path>/index.html (или файл). trailingSlash:'always' учитывается.
 *  3. Для ссылок /go/{partner} проверяет, что партнёр есть в
 *     src/data/partners.json (иначе клик уйдёт в фолбэк — это предупреждение).
 *
 * Внешние (http/https), mailto:, tel:, #-якоря — пропускаются.
 * Если dist/ нет — подсказывает запустить build и выходит с кодом 1.
 *
 * RATCHET (2026-06-30, гейт #4 — языковой префикс ссылок): на страницах из
 * языкового дерева /ru/ (и /uk/, если есть) КАЖДАЯ внутренняя ссылка на другую
 * страницу сайта обязана нести префикс /ru/ (соотв. /uk/). Ссылка без префикса
 * = FAIL, кроме перечисленных в scripts/.links-baseline.json. Намеренные
 * межъязыковые ссылки переключателя языка (`<a hreflang="…">`) и абсолютные
 * hreflang-alternate в <head> НЕ считаются нарушением. Кросс-сайтовую резолюцию
 * сюда НЕ добавляем (внешние ссылки по-прежнему пропускаются).
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PARTNERS_PATH = join(ROOT, 'src', 'data', 'partners.json');
const LINKS_BASELINE_PATH = join(ROOT, 'scripts', '.links-baseline.json');

// Языковые поддеревья, где внутренние ссылки обязаны нести свой префикс.
const LANG_TREES = ['ru', 'uk'];
// Пути-исключения (ассеты, спец-маршруты) — к ним правило префикса не применяем.
const PREFIX_SKIP = /^\/(go|images|_astro|fonts|icons|js|api)\//;
const ASSET_EXT = /\.(xml|svg|jpe?g|png|webp|avif|gif|ico|webmanifest|js|css|txt|json|pdf|woff2?)$/i;

// Бейслайн: массив строк "lang|href" (legacy-ссылки без префикса, grandfathered).
let LINKS_BASELINE = new Set();
if (existsSync(LINKS_BASELINE_PATH)) {
  try {
    const arr = JSON.parse(readFileSync(LINKS_BASELINE_PATH, 'utf8'));
    if (Array.isArray(arr)) LINKS_BASELINE = new Set(arr);
  } catch {
    /* битый бейслайн — пустой */
  }
}

/** Рекурсивно собрать все .html файлы. */
async function collectHtml(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectHtml(full)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

/** Достать href из href="..." и href='...'. */
function extractHrefs(html) {
  const hrefs = [];
  const re = /href\s*=\s*("([^"]*)"|'([^']*)')/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    hrefs.push(m[2] ?? m[3] ?? '');
  }
  return hrefs;
}

/** Достать <a>-теги: { href, hasHreflang } (для проверки языкового префикса). */
function extractAnchors(html) {
  const anchors = [];
  const re = /<a\b([^>]*)>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const attrs = m[1];
    const hm = attrs.match(/\bhref\s*=\s*("([^"]*)"|'([^']*)')/i);
    if (!hm) continue;
    anchors.push({
      href: hm[2] ?? hm[3] ?? '',
      hasHreflang: /\bhreflang\s*=/i.test(attrs),
    });
  }
  return anchors;
}

/** Языковой префикс файла в dist (ru|uk) или null для корня (en). */
function langTreeOf(file) {
  const rel = file.replace(DIST, '').replace(/\\/g, '/').replace(/^\/+/, '');
  for (const lang of LANG_TREES) {
    if (rel === lang || rel.startsWith(`${lang}/`)) return lang;
  }
  return null;
}

function isExternalOrSpecial(href) {
  return (
    href === '' ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('data:')
  );
}

/** Проверить, что внутренний путь существует в dist. */
async function pathExistsInDist(pathname) {
  // Убираем query и hash.
  const clean = pathname.split('#')[0].split('?')[0];
  const rel = clean.replace(/^\/+/, '');

  // /go/ обрабатывается Pages Function — в dist файла нет, это норма.
  if (rel === 'go' || rel.startsWith('go/')) return true;

  const candidates = [];
  if (rel === '' || clean.endsWith('/')) {
    candidates.push(join(DIST, rel, 'index.html'));
  } else {
    candidates.push(join(DIST, rel));
    candidates.push(join(DIST, `${rel}.html`));
    candidates.push(join(DIST, rel, 'index.html'));
  }
  for (const c of candidates) {
    if (existsSync(c)) {
      try {
        const s = await stat(c);
        if (s.isFile()) return true;
      } catch {
        /* ignore */
      }
    }
  }
  return false;
}

async function loadPartners() {
  try {
    const raw = await readFile(PARTNERS_PATH, 'utf8');
    const data = JSON.parse(raw);
    return data.partners ?? {};
  } catch {
    return {};
  }
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('[test:links] dist/ не найден. Сначала: npm run build');
    process.exit(1);
  }

  const htmlFiles = await collectHtml(DIST);
  const partners = await loadPartners();

  const brokenInternal = [];
  const unknownPartners = new Set();
  const langPrefixErrors = [];
  const langPrefixBaselined = [];
  let checked = 0;

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const hrefs = extractHrefs(html);
    for (const href of hrefs) {
      if (isExternalOrSpecial(href)) continue;
      checked += 1;

      // /go/{partner} — сверяем партнёра с картой.
      const goMatch = href.match(/^\/go\/([^/?#]+)/);
      if (goMatch) {
        const partner = decodeURIComponent(goMatch[1]);
        if (!Object.prototype.hasOwnProperty.call(partners, partner)) {
          unknownPartners.add(partner);
        }
        continue;
      }

      const ok = await pathExistsInDist(href);
      if (!ok) {
        brokenInternal.push({ file: file.replace(DIST, 'dist'), href });
      }
    }

    // RATCHET #4: языковой префикс на страницах /ru/ и /uk/.
    const lang = langTreeOf(file);
    if (lang) {
      for (const { href, hasHreflang } of extractAnchors(html)) {
        // Только относительные внутренние ссылки на страницы сайта.
        if (isExternalOrSpecial(href) || !href.startsWith('/')) continue;
        if (hasHreflang) continue; // намеренная межъязыковая ссылка (переключатель)
        const clean = href.split('#')[0].split('?')[0];
        if (PREFIX_SKIP.test(clean) || ASSET_EXT.test(clean)) continue;
        // Уже несёт нужный префикс — ок (учитываем и точное "/ru" без хвоста).
        if (clean === `/${lang}` || clean.startsWith(`/${lang}/`)) continue;
        const rec = `${lang}|${clean}`;
        if (LINKS_BASELINE.has(rec)) langPrefixBaselined.push({ file: file.replace(DIST, 'dist'), lang, href });
        else langPrefixErrors.push({ file: file.replace(DIST, 'dist'), lang, href });
      }
    }
  }

  console.log(
    `[test:links] HTML-страниц: ${htmlFiles.length}; внутренних ссылок проверено: ${checked}`,
  );

  if (unknownPartners.size > 0) {
    console.warn(
      `[test:links] предупреждение — партнёры не из partners.json (уйдут в фолбэк): ${[...unknownPartners].join(', ')}`,
    );
  }

  if (langPrefixBaselined.length > 0) {
    const uniq = new Set(langPrefixBaselined.map((b) => `${b.lang}|${b.href}`));
    console.log(
      `[test:links] BASELINE — ${langPrefixBaselined.length} ссылок без языкового префикса (legacy, бэкфилл; уникальных ${uniq.size}).`,
    );
  }

  let failed = false;

  if (brokenInternal.length > 0) {
    console.error(`[test:links] битые внутренние ссылки (${brokenInternal.length}):`);
    for (const b of brokenInternal) {
      console.error(`  ${b.file}  →  ${b.href}`);
    }
    failed = true;
  }

  if (langPrefixErrors.length > 0) {
    console.error(
      `[test:links] FAIL — внутренние ссылки без языкового префикса /ru/ или /uk/ (${langPrefixErrors.length}):`,
    );
    for (const b of langPrefixErrors.slice(0, 60)) {
      console.error(`  [${b.lang}] ${b.file}  →  ${b.href}  (нужен префикс /${b.lang}/)`);
    }
    if (langPrefixErrors.length > 60) console.error(`  …и ещё ${langPrefixErrors.length - 60}`);
    failed = true;
  }

  if (failed) process.exit(1);

  console.log(
    `[test:links] OK — битых внутренних ссылок нет, языковые префиксы /ru/ и /uk/ на месте${langPrefixBaselined.length ? ` (${langPrefixBaselined.length} legacy в бейслайне)` : ''}.`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error('[test:links] ошибка:', err);
  process.exit(1);
});
