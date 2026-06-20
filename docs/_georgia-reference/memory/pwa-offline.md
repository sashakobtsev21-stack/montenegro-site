---
name: pwa-offline
description: Сайт — PWA (установка на экран + оффлайн); как устроены manifest/service worker и как НЕ сломать кэш
metadata:
  type: project
---

Сайт — PWA (Фаза 7, коммит `2bcc0cf`, 2026-06-16). Установка на главный экран + оффлайн.

**Состав:**
- `public/manifest.webmanifest` — name/short_name/icons/`theme_color #6b1f2e`/`background #f2efe9`/display standalone/start_url `/`. Иконки `public/icons/` (192, 512, 512-maskable, apple-touch-icon-180) сгенерированы из `public/favicon.svg` через sharp (скрипт `_scratch/build-icons.mjs`).
- `public/sw.js` — service worker. Стратегии: HTML-навигации **network-first** (свежее онлайн, `/offline.html` офлайн); `/_astro/`+`/fonts/` (хешированные, иммутабельные) **cache-first**; картинки и прочее — network-first + кэш-фолбэк. Кэш версионируется `gg-vN`; при активации новой версии старые кэши удаляются. HTML всегда из сети онлайн → контент НЕ устаревает.
- `public/js/sw-register.js` — регистрация (внешний модуль, CSP `script-src 'self'`).
- `public/offline.html` — заглушка офлайн (en/ru/uk, noindex, inline-стили под `style-src 'unsafe-inline'`).
- BaseLayout `<head>`: `link rel=manifest` + `meta theme-color` (литерал `#6b1f2e` = `--color-wine`; meta требует литерал, не CSS-var) + `apple-touch-icon`; в конце `<body>` — `sw-register.js`.

**Как НЕ сломать:**
- Меняешь логику кэширования в sw.js → **бампни `VERSION`** (`gg-v2`…), иначе у вернувшихся посетителей останется старый SW.
- НЕ добавляй агрессивный precache HTML-страниц — будет устаревание; страницы только network-first.
- CSP не трогать: SW и manifest идут со 'self' (`default-src 'self'` покрывает worker-src/manifest-src). [[home-hero-rotation]] напоминает: инлайн-JS запрещён — sw-register внешний.
- Иконки менять → перегенерить из `favicon.svg` через `build-icons.mjs`.
