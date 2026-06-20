---
name: photo-pipeline-hybrid
description: "Как раскатывать фото-галереи статей — гибрид (агенты на факты, основной чат на фото) + детерминированный конвейер Wikimedia Commons"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c9aee0e9-3ff0-466e-a458-550602a69e6d
---

Владелец спросил «почему фото делает основной чат, а не агенты», и выбрал **гибрид**.

**Why:** фоновые research-агенты не переживают перезапуск сессии (стартуют вхолодную); и только основной чат может **увидеть** изображение (Read картинки), чтобы написать точный alt и отсеять мусорные/ч-б кадры — этого требует стандарт [[article-content-standards]]. Агент картинку не видит → риск неточных подписей.

**How to apply** (на каждый батч раскатки достопримечательностей/городов):
1. **Факты** — можно отдать research-агенту ИЛИ самому через WebFetch en.wikipedia: расстояния из Тбилиси/Кутаиси/Батуми + 3–5 проверяемых фактов (НЕ выдумывать цены/даты; мифы не публиковать).
2. **Фото — основной чат, детерминированно через 2 скрипта в `scripts/`:**
   - `node scripts/commons-candidates.mjs "Category:Name" | "поисковый запрос" [limit]` → реальные файлы Wikimedia Commons с лицензией+автором+URL (без галлюцинаций). Берём только CC0/CC BY/CC BY-SA/PD/Attribution.
   - манифест JSON `[{url, out, width?, cover?}]` → `node scripts/build-gallery.mjs manifest.json` → webp ≤200КБ (само снижает качество и ширину), обложка `cover:true` = кроп 16:9 в `/images/{slug}.webp`.
   - **обязательно** открыть каждый webp через Read, проверить содержимое, отсеять мусор, написать точные `alt` + `credit: 'Фото: {author} / Wikimedia Commons, {license}'`.
3. **Сборка/верификация/коммит** — в основном чате (паритет ru+uk, iframe Google не в статике, build/check/test:links).

temp-манифесты держать в корне как `.tmp-*.json` и удалять перед коммитом. Скрипты `commons-candidates.mjs`/`build-gallery.mjs` закоммичены (`2abecda`), переиспользуемы.

**Грабли с full-res URL (2026-06-16):** `originalUrl`, который возвращает photo-researcher, часто 404 — агент неверно конструирует хеш-путь `upload.wikimedia.org/.../X/XX/Name.jpg`. Надёжно качать по ТОЧНОМУ имени файла через `https://commons.wikimedia.org/wiki/Special:FilePath/<encodeURIComponent(title)>` — редирект на реальный файл независимо от хеша (`fetch` следует редиректу). Имя берём из `commonsPageUrl` (часть после `File:`). Внимание к нелатинице в именах (напр. польское «Bordżomi» с `d`, грузинские титулы). Качать не burst'ом — по одному с паузой (build-gallery уже умеет ретрай 429 + межзапросную паузу).
