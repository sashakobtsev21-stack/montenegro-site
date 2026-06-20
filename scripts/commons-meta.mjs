// Dev-хелпер: по списку File:-заголовков печатает автора+лицензию для credit-строки.
// Использование: node scripts/commons-meta.mjs "File:Ananuri Fortress 01.jpg" "File:..."
const UA = 'GeorgiaGuidebook/1.0 (sashakobtsev21@gmail.com)';

const stripHtml = (s = '') =>
  s
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const titles = process.argv.slice(2);
if (!titles.length) {
  console.error('Usage: node scripts/commons-meta.mjs "File:Name.jpg" ...');
  process.exit(1);
}

const base =
  'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=1280&titles=';
const url = base + encodeURIComponent(titles.join('|'));
const res = await fetch(url, { headers: { 'User-Agent': UA } });
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
const pages = data?.query?.pages ?? {};
for (const p of Object.values(pages)) {
  const ii = p.imageinfo?.[0];
  if (!ii) {
    console.log(`\n${p.title}\n  !! no imageinfo`);
    continue;
  }
  const meta = ii.extmetadata ?? {};
  console.log(
    `\n${p.title.replace('File:', '')}` +
      `\n  author:  ${stripHtml(meta.Artist?.value ?? '—')}` +
      `\n  license: ${stripHtml(meta.LicenseShortName?.value ?? '—')}` +
      `\n  size:    ${ii.width}x${ii.height}`,
  );
}
