/**
 * make-og.mjs — генерирует дефолтную OG-картинку public/og-default.jpg
 * (1200×630, формат для соцсетей) из hero-изображения. Запуск:
 *   node scripts/make-og.mjs
 * Перезапускать при смене hero. Per-page OG берёт обложку статьи (BaseLayout).
 */
import sharp from 'sharp';

const SRC = 'src/assets/hero/gergeti-kazbek.jpg';
const OUT = 'public/og-default.jpg';

await sharp(SRC).resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toFile(OUT);
console.log(`og: ${OUT} written from ${SRC}`);
