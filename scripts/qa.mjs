// Финальный QA-оркестратор Georgia Guidebook (ROADMAP #21).
// Запуск: node scripts/qa.mjs   (или npm run qa)
//
// Делает два прохода и печатает отчёт GO/NO-GO с разбивкой
// критические / средние / минорные:
//   1) ГЕЙТЫ — npm run check · build · test(enums+parity+photos+interlinks) · test:links · lint.
//   2) АУДИТ dist/ (только Node-встроенные, без новых зависимостей):
//      SEO-обвязка, взаимность hreflang, schema.org (JSON-LD), доступность (alt/h1),
//      перф-бюджет (JS ≤50КБ/стр, картинки ≤200КБ, width/height у img),
//      render-smoke (нет TODO/undefined/[object Object] в видимом тексте),
//      безопасность (CSP без unsafe-inline в script-src; нет inline-обработчиков/javascript:).
//
// Браузерный слой (Lighthouse ≥90 + axe-core a11y/контраст, Playwright-респонсив) —
// реализован отдельной командой `npm run qa:browser` (D8 ✅). Здесь — статический
// слой, не требующий dev-зависимостей и headless-браузера.

import { execSync } from 'node:child_process';
import { readFileSync, statSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';

const ORIGIN = 'https://georgiaguidebook.com';
const TITLE_SUFFIX = ' — Georgia Guidebook';
const DIST = 'dist';

const findings = []; // {sev:'critical'|'medium'|'minor', area, where, msg}
const add = (sev, area, where, msg) => findings.push({ sev, area, where, msg });
const referenced = new Set(); // dist-пути картинок, реально подключённых из HTML (src/srcset)

// ---------- helpers ----------
function walk(dir, ext, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory() && e.name === '_scratch') continue; // dev-конвейер, не деплоится (gitignored)
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (!ext || ext.test(e.name)) out.push(p);
  }
  return out;
}
const fileToUrl = (f) => {
  const rel = relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  return ORIGIN + '/' + rel;
};
const matchAll = (s, re) => [...s.matchAll(re)].map((m) => m[1]);
// длину title/description считаем по «человеческому» тексту, без HTML-сущностей
const decode = (s = '') =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&laquo;|&raquo;/g, '«');

// ---------- PHASE 1: gates ----------
const gates = [
  ['check', 'npm run check'],
  ['build', 'npm run build'],
  ['test', 'npm test'],
  ['links', 'npm run test:links'],
  ['lint', 'npm run lint'],
];
console.log('=== QA фаза 1: гейты ===');
// чистая сборка: dist/_astro между сборками не самоочищается, а на Cloudflare
// сборка идёт из чистого репо — чистим, чтобы аудит совпадал с деплоем (нет orphan-ассетов).
rmSync(DIST, { recursive: true, force: true });
const gateResult = {};
for (const [name, cmd] of gates) {
  try {
    execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
    gateResult[name] = true;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    gateResult[name] = false;
    const tail = ((e.stdout || '') + (e.stderr || '')).split('\n').slice(-6).join('\n');
    add('critical', 'gate', name, `гейт упал:\n${tail}`);
    console.log(`  ✗ ${name} — УПАЛ`);
  }
}

// npm audit: на статическом Astro-сайте даже «prod»-дерево (astro→vite→esbuild) —
// это BUILD-tooling, в задеплоенную статику оно не попадает. Поэтому уязвимости
// показываем (medium, видно в отчёте), но GO не блокируем: рантайм-поверхности у
// них на проде нет, а фикс — только мажорным апгрейдом Astro (решение владельца).
try {
  execSync('npm audit --omit=dev --audit-level=high', { stdio: 'pipe', encoding: 'utf8' });
  console.log('  ✓ npm audit (prod): high/critical нет');
} catch {
  add('medium', 'security', 'npm audit', 'prod-дерево: high/critical (esbuild/vite — build-tooling Astro, в прод-бандл не входят; фикс = мажорный апгрейд). Не блокирует GO для статики.');
  console.log('  ⚠ npm audit (prod): high/critical в build-tooling (esbuild/vite) — см. note');
}
try {
  let auditJson;
  try {
    auditJson = execSync('npm audit --json', { stdio: 'pipe', encoding: 'utf8' });
  } catch (e) {
    auditJson = e.stdout; // npm audit выходит !=0 при наличии уязвимостей — JSON в stdout
  }
  const v = JSON.parse(auditJson)?.metadata?.vulnerabilities;
  if (v && v.total) console.log(`  ⚠ npm audit (вкл. dev): ${v.total} уязвимостей (dev-tooling, не в прод-бандл)`);
} catch {
  /* npm audit недоступен/офлайн — пропускаем инфо-строку */
}

// ---------- PHASE 2: dist audit ----------
console.log('=== QA фаза 2: аудит dist/ ===');
if (!existsSync(DIST)) {
  add('critical', 'dist', DIST, 'нет каталога dist/ — сборка не прошла; аудит пропущен.');
} else {
  const htmlFiles = walk(DIST, /\.html$/);
  // карта url → {alternates:Map(lang->url), file}
  const pageMap = new Map();

  for (const f of htmlFiles) {
    const html = readFileSync(f, 'utf8');
    const url = fileToUrl(f);
    // не-контентные служебные страницы: 404 и PWA-офлайн — без canonical/desc/og/h1
    const isUtility = /[\\/]404[\\/]/.test(f) || /404\.html$/.test(f) || /offline\.html$/.test(f);

    // --- SEO ---
    const titleM = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleM ? decode(titleM[1]) : '';
    if (!title) add('medium', 'seo', f, 'нет <title>');
    else {
      const core = title.endsWith(TITLE_SUFFIX) ? title.slice(0, -TITLE_SUFFIX.length) : title;
      if (core.length > 60) add('medium', 'seo', f, `title (без суффикса) ${core.length}>60: «${core}»`);
    }
    const descRaw = (html.match(/<meta name="description" content="([^"]*)"/i) || [])[1];
    const desc = descRaw == null ? null : decode(descRaw);
    if (!isUtility && (desc == null || desc.trim() === '')) add('medium', 'seo', f, 'нет meta description');
    else if (desc && desc.length > 155) add('medium', 'seo', f, `description ${desc.length}>155`);
    const canon = matchAll(html, /<link rel="canonical" href="([^"]*)"/gi);
    if (!isUtility && canon.length === 0) add('critical', 'seo', f, 'нет canonical');
    if (canon.length > 1) add('medium', 'seo', f, `${canon.length} canonical (должен быть 1)`);
    const og = matchAll(html, /<meta property="og:image" content="([^"]*)"/gi);
    if (!isUtility && og.length === 0) add('medium', 'seo', f, 'нет og:image');

    // --- hreflang ---
    const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)];
    const altMap = new Map(alts.map((m) => [m[1], m[2]]));
    if (altMap.size) {
      if (!altMap.has('x-default')) add('medium', 'hreflang', f, 'нет x-default');
      const self = canon[0];
      const listsSelf = self && [...altMap.values()].some((u) => u === self);
      if (self && !listsSelf) add('medium', 'hreflang', f, 'hreflang не содержит собственный canonical');
    }
    pageMap.set(url, { file: f, altMap, canon: canon[0] });

    // --- собрать реально подключённые картинки (src + srcset, <img> и <source>) ---
    for (const u of matchAll(html, /\ssrc="([^"]+\.(?:webp|avif|jpe?g|png|svg))"/gi)) {
      if (u.startsWith('/')) referenced.add(join(DIST, u.split('?')[0]));
    }
    for (const ss of matchAll(html, /\ssrcset="([^"]+)"/gi)) {
      for (const part of ss.split(',')) {
        const u = part.trim().split(/\s+/)[0];
        if (u && u.startsWith('/')) referenced.add(join(DIST, u.split('?')[0]));
      }
    }

    // --- a11y ---
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    for (const tag of imgs) {
      const valued = tag.match(/\salt="([^"]*)"/i); // alt="..."
      const boolAlt = /\salt(?=[\s/>])/i.test(tag); // alt (булев, пустой)
      if (!valued && !boolAlt) add('critical', 'a11y', f, `у <img> нет alt: ${tag.slice(0, 90)}`);
      else if ((valued && valued[1].trim() === '') || (!valued && boolAlt))
        add('minor', 'a11y', f, `пустой alt (декоративная?) у <img>: ${tag.slice(0, 90)}`);
      if (!/\swidth="/i.test(tag) || !/\sheight="/i.test(tag))
        add('minor', 'perf', f, `<img> без width/height (CLS): ${tag.slice(0, 90)}`);
    }
    const h1s = matchAll(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
    if (!isUtility) {
      if (h1s.length === 0) add('medium', 'a11y', f, 'нет <h1>');
      else if (h1s.length > 1) add('medium', 'a11y', f, `${h1s.length} <h1> (должен быть 1)`);
    }

    // --- schema.org JSON-LD ---
    const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    for (const m of ld) {
      try {
        const data = JSON.parse(m[1]);
        const top = Array.isArray(data) ? data : [data];
        for (const root of top) {
          if (!root['@context']) add('medium', 'schema', f, 'JSON-LD без @context');
          // форма @graph: типы у дочерних узлов, а не у корня
          const typed = Array.isArray(root['@graph']) ? root['@graph'] : [root];
          for (const n of typed) if (!n['@type']) add('medium', 'schema', f, 'узел JSON-LD без @type');
        }
      } catch {
        add('critical', 'schema', f, 'JSON-LD не парсится (битый schema.org)');
      }
    }

    // --- render-smoke (видимый текст, без script/style/comment) ---
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '');
    for (const bad of ['[object Object]', 'Invalid Date', '>undefined<', '>NaN<', '>TODO', 'NaN%']) {
      if (visible.includes(bad)) add('critical', 'smoke', f, `в видимом тексте найдено «${bad}»`);
    }

    // --- security (inline-обработчики / javascript:) ---
    if (/\son(click|load|error|mouseover|focus)="/i.test(html))
      add('critical', 'security', f, 'инлайн-обработчик события (on*=) — нарушает CSP/§18');
    if (/href="javascript:/i.test(html)) add('critical', 'security', f, 'javascript:-URL');

    // --- perf: JS-бюджет страницы (внешние self-скрипты) ---
    let jsBytes = 0;
    for (const src of matchAll(html, /<script[^>]*\ssrc="(\/[^"]+\.js)"/gi)) {
      const jf = join(DIST, src.split('?')[0]);
      if (existsSync(jf)) jsBytes += statSync(jf).size;
    }
    if (jsBytes > 50 * 1024)
      add('medium', 'perf', f, `JS на странице ${(jsBytes / 1024) | 0}КБ > 50КБ`);
  }

  // --- hreflang взаимность (после сбора всех страниц) ---
  for (const [url, p] of pageMap) {
    for (const [lang, target] of p.altMap) {
      if (lang === 'x-default') continue;
      const tp = pageMap.get(target) || pageMap.get(target.endsWith('/') ? target : target + '/');
      if (!tp) {
        add('critical', 'hreflang', p.file, `hreflang ${lang} → ${target} — целевой страницы нет в dist`);
        continue;
      }
      const back = [...tp.altMap.values()].some((u) => u === url || u === p.canon);
      if (!back) add('critical', 'hreflang', p.file, `hreflang не взаимный: ${target} не ссылается назад на ${url}`);
    }
  }

  // --- картинки ≤200КБ (только реально подключённые из HTML; orphan-ассеты
  // из кэша Astro не деплоятся на чистой CI-сборке, их не считаем) ---
  for (const img of referenced) {
    if (/\.svg$/i.test(img)) continue; // векторные — бюджет не про них
    if (!existsSync(img)) {
      add('critical', 'perf', img, 'подключённая картинка отсутствует в dist (битая ссылка)');
      continue;
    }
    const kb = statSync(img).size / 1024;
    if (kb > 200) add('critical', 'perf', img, `изображение ${kb | 0}КБ > 200КБ (§15)`);
  }

  // --- CSP в public/_headers ---
  if (existsSync('public/_headers')) {
    const headers = readFileSync('public/_headers', 'utf8');
    const csp = (headers.match(/Content-Security-Policy:\s*([^\n]+)/i) || [])[1] || '';
    const scriptSrc = (csp.match(/script-src([^;]*)/i) || [])[1] || '';
    if (!csp) add('critical', 'security', 'public/_headers', 'нет Content-Security-Policy');
    else if (/unsafe-inline/.test(scriptSrc))
      add('critical', 'security', 'public/_headers', "script-src содержит 'unsafe-inline'");
  } else add('critical', 'security', 'public/_headers', 'нет файла _headers');
}

// ---------- REPORT ----------
const bySev = (s) => findings.filter((f) => f.sev === s);
const crit = bySev('critical');
const med = bySev('medium');
const minor = bySev('minor');

// сжать повторяющиеся (по area+msg-шаблону) — показать счётчики
function summarize(list) {
  const groups = new Map();
  for (const f of list) {
    const key = `${f.area}: ${f.msg.replace(/«[^»]*»|\d+/g, '·').slice(0, 80)}`;
    if (!groups.has(key)) groups.set(key, { count: 0, sample: f });
    groups.get(key).count++;
  }
  return [...groups.entries()].sort((a, b) => b[1].count - a[1].count);
}

console.log('\n========== QA-ОТЧЁТ ==========');
const gateLine = gates.map(([n]) => `${gateResult[n] ? '✓' : '✗'}${n}`).join(' · ');
console.log(`Гейты: ${gateLine}`);
console.log(`Находки: критических ${crit.length} · средних ${med.length} · минорных ${minor.length}\n`);

for (const [label, list] of [
  ['КРИТИЧЕСКИЕ (блокируют публикацию)', crit],
  ['СРЕДНИЕ (исправить до релиза)', med],
  ['МИНОРНЫЕ (по возможности)', minor],
]) {
  if (!list.length) continue;
  console.log(`— ${label}:`);
  for (const [key, { count, sample }] of summarize(list)) {
    const at = sample.where ? `  [${relative('.', String(sample.where)).replace(/\\/g, '/')}${count > 1 ? ` +${count - 1}` : ''}]` : '';
    console.log(`  • ${key}${at}`);
    if (count === 1 && sample.msg.length > 80) console.log(`      ${sample.msg.split('\n')[0]}`);
  }
  console.log('');
}

const go = crit.length === 0;
console.log(`ВЕРДИКТ: ${go ? 'GO ✅ — критических нет' : 'NO-GO ⛔ — есть критические'}`);
console.log('(Браузерный слой — `npm run qa:browser`: mobile Lighthouse по ключевым страницам, D8 ✅.)');
process.exit(go ? 0 : 1);
