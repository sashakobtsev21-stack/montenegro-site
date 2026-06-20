// Запекает РЕАЛЬНУЮ дорожную геометрию маршрутов (по дорогам, а не прямые линии)
// в src/data/route-geometry.json — ОДИН раз, локально (НЕ в сборку: на Cloudflare
// нет сети к OSRM, и билд не должен зависеть от внешнего API). RoutePage импортирует
// этот JSON и отдаёт полилинию в MapEmbed → map-init.js рисует её поверх Leaflet.
//
// Источник: публичный OSRM (router.project-osrm.org, профиль driving) — без ключа.
// Геометрия simplified + округление до 5 знаков → компактный полилайн (перф §15).
// Запуск: node scripts/build-route-geometry.mjs   (повторять при правке стопов).
//
// Координаты стопов в routes — [lat, lng]; OSRM хочет lng,lat; geojson отдаёт
// [lng,lat] → конвертируем обратно в [lat,lng] для Leaflet.

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const ROUTES_DIR = 'src/content/routes/ru';
const OUT = 'src/data/route-geometry.json';
const COORD_RE = /coord:\s*\[\s*([\d.+-]+)\s*,\s*([\d.+-]+)\s*\]/g;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round5 = (n) => Math.round(n * 1e5) / 1e5;

async function osrmGeometry(stops) {
  const coords = stops.map(([lat, lng]) => `${lng},${lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=simplified&geometries=geojson`;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'GeorgiaGuidebook/1.0 (info@georgiaguidebook.com)' } });
      if (res.ok) {
        const json = await res.json();
        const line = json?.routes?.[0]?.geometry?.coordinates;
        if (Array.isArray(line) && line.length > 1) {
          return line.map(([lng, lat]) => [round5(lat), round5(lng)]);
        }
        return null;
      }
      if (res.status === 429 || res.status >= 500) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      return null;
    } catch {
      await sleep(1500 * (attempt + 1));
    }
  }
  return null;
}

const files = (await readdir(ROUTES_DIR)).filter((f) => f.endsWith('.md'));
const result = {};
let ok = 0;
for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const text = await readFile(`${ROUTES_DIR}/${file}`, 'utf8');
  const fm = text.split('---')[1] || '';
  const stops = [];
  let mtch;
  COORD_RE.lastIndex = 0;
  while ((mtch = COORD_RE.exec(fm)) !== null) {
    stops.push([parseFloat(mtch[1]), parseFloat(mtch[2])]);
  }
  if (stops.length < 2) {
    console.log(`SKIP ${slug} (stops=${stops.length})`);
    continue;
  }
  await sleep(1100); // вежливо к публичному OSRM
  const geom = await osrmGeometry(stops);
  if (geom) {
    result[slug] = geom;
    ok++;
    console.log(`OK   ${slug}  stops=${stops.length}  points=${geom.length}`);
  } else {
    console.log(`FAIL ${slug}  (OSRM не вернул маршрут — будет фолбэк на прямые линии)`);
  }
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(result) + '\n');
console.log(`\n${ok}/${files.length} маршрутов с геометрией → ${OUT}`);
