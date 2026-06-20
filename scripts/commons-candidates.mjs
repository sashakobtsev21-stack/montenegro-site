// Dev-хелпер раскатки фото-галерей: тянет кандидатов из Wikimedia Commons API.
// Использование: node scripts/commons-candidates.mjs "Category:Narikala" [limit]
// Печатает реальные файлы категории с лицензией/автором/URL — БЕЗ галлюцинаций.
// На сайт не попадает (только инструмент конвейера, см. PROGRESS §11).

const UA = 'GeorgiaGuidebook/1.0 (sashakobtsev21@gmail.com)';
const OK_LICENSES = [
  'cc0',
  'cc-by-1.0',
  'cc-by-2.0',
  'cc-by-2.5',
  'cc-by-3.0',
  'cc-by-4.0',
  'cc-by-sa-1.0',
  'cc-by-sa-2.0',
  'cc-by-sa-2.5',
  'cc-by-sa-3.0',
  'cc-by-sa-4.0',
  'public domain',
  'pd',
];

const stripHtml = (s = '') =>
  s
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const norm = (s = '') => s.toLowerCase().replace(/[\s_]+/g, '-');
const okLicense = (lic = '') => {
  const l = norm(lic);
  return OK_LICENSES.some((x) => l.includes(norm(x))) || l.includes('attribution');
};

async function fetchCategory(category, limit = 80) {
  // "Category:Name" → члены категории; иначе — полнотекстовый поиск по файлам.
  const base = 'https://commons.wikimedia.org/w/api.php?action=query&format=json';
  const common = '&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=1280';
  const url = category.startsWith('Category:')
    ? base +
      '&generator=categorymembers&gcmtype=file&gcmlimit=' +
      limit +
      '&gcmtitle=' +
      encodeURIComponent(category) +
      common
    : base +
      '&generator=search&gsrnamespace=6&gsrlimit=' +
      limit +
      '&gsrsearch=' +
      encodeURIComponent(category) +
      common;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${category}`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const out = [];
  for (const p of Object.values(pages)) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    const meta = ii.extmetadata ?? {};
    const lic = stripHtml(meta.LicenseShortName?.value ?? '');
    const artist = stripHtml(meta.Artist?.value ?? '');
    out.push({
      title: p.title,
      mime: ii.mime,
      w: ii.width,
      h: ii.height,
      license: lic,
      ok: okLicense(lic),
      author: artist,
      thumb: ii.thumburl,
      full: ii.url,
    });
  }
  return out;
}

const [, , category, limitArg] = process.argv;
if (!category) {
  console.error('Usage: node scripts/commons-candidates.mjs "Category:Name" [limit]');
  process.exit(1);
}

const rows = await fetchCategory(category, Number(limitArg) || 80);
rows.sort((a, b) => Number(b.ok) - Number(a.ok) || b.w * b.h - a.w * a.h);

console.log(`\n=== ${category} — ${rows.length} files ===\n`);
for (const r of rows) {
  if (!r.mime?.startsWith('image')) continue;
  const flag = r.ok ? 'OK ' : 'xx ';
  console.log(
    `${flag}[${r.license}] ${r.w}x${r.h}  ${r.title.replace('File:', '')}` +
      `\n      author: ${r.author || '—'}` +
      `\n      thumb:  ${r.thumb}`,
  );
}
console.log(`\nOK-licensed images: ${rows.filter((r) => r.ok && r.mime?.startsWith('image')).length}\n`);
