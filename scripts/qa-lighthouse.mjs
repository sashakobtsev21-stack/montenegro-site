// Браузерный слой QA Georgia Guidebook (ROADMAP #21, решение владельца D8).
// Запуск: node scripts/qa-lighthouse.mjs   (или npm run qa:browser)
//
// Mobile-Lighthouse по ключевым страницам собранного сайта. Чтобы не зависеть от
// astro preview и не ловить проблемы с убийством дочернего процесса на Windows —
// поднимаем КРОШЕЧНЫЙ статический сервер на dist прямо здесь (порт 0 = свободный).
//
// Пороги:
//   • accessibility / seo / best-practices ≥ 90 — ХАРД (детерминированы, правило-based);
//   • performance — печатаем и WARN при <90 (лабораторный скор зависит от загрузки
//     машины/троттлинга, спорадически проседает — хард-фейлить одиночный прогон нельзя).
//
// Запускается ОТДЕЛЬНО от `npm run qa` (статический слой), чтобы тот оставался быстрым
// и стабильным без браузера. Нужен установленный Chrome (chrome-launcher найдёт сам).

import http from 'node:http';
import { readFile, access } from 'node:fs/promises';
import { constants, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, extname } from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const DIST = 'dist';
// Репрезентативный срез шаблонов (не все 294 страницы — это долго):
const PAGES = [
  ['/', 'главная (hero, витрина)'],
  ['/goroda/tbilisi/', 'город (фото-тяжёлая статья)'],
  ['/arenda-avto/kak-arendovat-avto/', 'статья (#16/#17, figure+карта)'],
  ['/eda/', 'директория «Где поесть» (фильтры)'],
  ['/marshruty/', 'хаб маршрутов'],
];
const HARD = ['accessibility', 'seo', 'best-practices'];
const THRESHOLD = 90;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

// --- сборка при необходимости ---
if (!existsSync(join(DIST, 'index.html'))) {
  console.log('dist/ пуст — собираю (npm run build)…');
  execSync('npm run build', { stdio: 'inherit' });
}

// --- крошечный статический сервер на dist ---
const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  else if (!extname(p)) p += '/index.html';
  try {
    const file = join(DIST, p);
    await access(file, constants.F_OK);
    const buf = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('404');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
console.log(`Статический сервер dist → ${base}\nЗапускаю Chrome (mobile Lighthouse)…\n`);

// --- Chrome ---
const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});

const results = [];
let hardFail = 0;
let perfWarn = 0;
try {
  for (const [path, label] of PAGES) {
    const rr = await lighthouse(
      base + path,
      { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', ...HARD] },
      undefined,
    );
    const c = rr.lhr.categories;
    const score = (k) => Math.round((c[k]?.score ?? 0) * 100);
    const row = {
      path,
      label,
      perf: score('performance'),
      a11y: score('accessibility'),
      bp: score('best-practices'),
      seo: score('seo'),
    };
    results.push(row);
    for (const k of HARD) {
      const map = { accessibility: 'a11y', seo: 'seo', 'best-practices': 'bp' };
      if (row[map[k]] < THRESHOLD) hardFail++;
    }
    if (row.perf < THRESHOLD) perfWarn++;
    console.log(
      `  ${path}\n    perf ${row.perf}  a11y ${row.a11y}  best-practices ${row.bp}  seo ${row.seo}`,
    );
  }
} finally {
  // На Windows chrome-launcher.kill() иногда падает EPERM при удалении temp-профиля
  // (Chrome ещё не отпустил папку) — аудиты к этому моменту завершены, ошибку глушим.
  try {
    await chrome.kill();
  } catch {
    /* temp-cleanup гонка на Windows — несущественно */
  }
  try {
    server.close();
  } catch {
    /* noop */
  }
}

// --- отчёт ---
console.log('\n========== LIGHTHOUSE (mobile) ==========');
console.log('страница                                  perf  a11y  bp   seo');
for (const r of results) {
  console.log(
    `${r.path.padEnd(42)}${String(r.perf).padEnd(6)}${String(r.a11y).padEnd(6)}${String(r.bp).padEnd(5)}${r.seo}`,
  );
}
console.log('');
if (perfWarn) console.log(`⚠ performance <${THRESHOLD} на ${perfWarn} стр. (лабораторный скор зависит от машины — перепроверьте локально).`);
if (hardFail) {
  console.log(`⛔ NO-GO: accessibility/seo/best-practices <${THRESHOLD} — ${hardFail} нарушений.`);
  process.exit(1);
}
console.log(`✅ GO: accessibility/seo/best-practices ≥${THRESHOLD} на всех проверенных страницах.`);
