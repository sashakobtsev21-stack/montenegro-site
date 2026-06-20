// Адаптивная проверка вёрстки (ROADMAP #21 / D8): ловит горизонтальное
// переполнение (scrollWidth > clientWidth) на узких экранах — ровно ту боль,
// с которой начинался аудит мобайла. Playwright на СИСТЕМНОМ Chrome
// (channel:'chrome' — без скачивания Chromium). Запуск: npm run qa:responsive
//
// Поднимает крошечный статический сервер на dist (как qa-lighthouse) и для
// каждого шаблона на каждой ширине меряет scrollWidth/clientWidth; при переливе
// >1px — находка + топ-виновники (элементы, чья правая граница за вьюпортом).

import http from 'node:http';
import { readFile, access } from 'node:fs/promises';
import { constants, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, extname } from 'node:path';
import { chromium } from 'playwright-core';

const DIST = 'dist';
const PAGES = ['/', '/goroda/tbilisi/', '/arenda-avto/kak-arendovat-avto/', '/eda/', '/razvlecheniya/', '/strahovka/', '/marshruty/', '/novosti/'];
const WIDTHS = [320, 360, 414, 768, 1280];
const TOLERANCE = 1; // субпиксели/округления
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.xml': 'application/xml',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json',
};

if (!existsSync(join(DIST, 'index.html'))) {
  console.log('dist/ пуст — собираю…');
  execSync('npm run build', { stdio: 'inherit' });
}

const server = http.createServer(async (q, s) => {
  let p = decodeURIComponent((q.url || '/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  else if (!extname(p)) p += '/index.html';
  try {
    const f = join(DIST, p);
    await access(f, constants.F_OK);
    s.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' });
    s.end(await readFile(f));
  } catch { s.writeHead(404); s.end('x'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
console.log(`Сервер dist → ${base}\nПроверяю переполнение на ширинах ${WIDTHS.join('/')}…\n`);

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const findings = [];
try {
  const page = await browser.newPage();
  for (const path of PAGES) {
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(base + path, { waitUntil: 'load', timeout: 30000 });
      const res = await page.evaluate((tol) => {
        const de = document.documentElement;
        const cw = de.clientWidth;
        const sw = Math.max(de.scrollWidth, document.body.scrollWidth);
        const off = [];
        if (sw - cw > tol) {
          for (const el of document.body.querySelectorAll('*')) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.right > cw + tol) {
              off.push({
                sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : ''),
                right: Math.round(r.right),
              });
            }
          }
        }
        // самые «правые» уникальные виновники
        const top = off.sort((a, b) => b.right - a.right).slice(0, 4);
        return { cw, sw, top };
      }, TOLERANCE);
      if (res.sw - res.cw > TOLERANCE) {
        findings.push({ path, w, overflow: res.sw - res.cw, offenders: res.top });
        console.log(`  ✗ ${path} @${w}px — перелив ${res.sw - res.cw}px`);
      }
    }
  }
  await page.close();
} finally {
  await browser.close();
  server.close();
}

console.log('\n========== RESPONSIVE (scrollWidth ≤ clientWidth) ==========');
if (!findings.length) {
  console.log(`✅ GO: горизонтального переполнения нет на ${PAGES.length} шаблонах × ${WIDTHS.length} ширин.`);
  process.exit(0);
}
console.log(`⛔ NO-GO: переполнение на ${findings.length} комбинациях:\n`);
for (const f of findings) {
  console.log(`  ${f.path} @${f.w}px (+${f.overflow}px):`);
  for (const o of f.offenders) console.log(`      ${o.sel}  → right=${o.right}`);
}
process.exit(1);
