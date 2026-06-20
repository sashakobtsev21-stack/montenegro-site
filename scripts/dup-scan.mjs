// Dev-хелпер: ищет байт-идентичные дубликаты webp в public/images.
import { readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const root = 'public/images';
const map = new Map();
function walk(d) {
  for (const f of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.webp')) {
      const h = createHash('sha1').update(readFileSync(p)).digest('hex');
      const arr = map.get(h) ?? [];
      arr.push(p.split('\\').join('/'));
      map.set(h, arr);
    }
  }
}
walk(root);
let dups = 0;
for (const arr of map.values()) {
  if (arr.length > 1) {
    dups++;
    console.log('DUP: ' + arr.join('  =  '));
  }
}
console.log(dups ? `\n${dups} duplicate group(s)` : 'No byte-identical duplicates found');
