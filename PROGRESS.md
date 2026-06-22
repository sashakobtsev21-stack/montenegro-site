# PROGRESS — montenegro-site

Снимок прогресса. Обновлять после каждой доработки (правило дисциплины, `CLAUDE.md`).

_Обновлено: 2026-06-22 (опубликована статья-СТОЛИЦА Podgorica — `category=cities`, тройка en/ru/uk, 15 фото CC, `npm run qa` = GO)._

## Состояние (факт)
- **Движок:** Astro 6.4.6 static/SSG, Tailwind 4, Leaflet; деплой Cloudflare Workers (push в `main` = деплой). Сборка 70 страниц, `npm run qa` = **GO**.
- **Языки:** en (корень) / ru (`/ru/`) / uk (`/uk/`), EN-first.
- **Контент:** 6 статей × 3 языка — `montenegro-travel-guide`, `best-time-to-visit-montenegro`, `renting-a-car-in-montenegro`, `cost-of-living-in-montenegro`, `durmitor-national-park` (каждая cover + 3 инлайн-фото) и **`podgorica-travel-guide`** (СТОЛИЦА, `category=cities`, первая статья в хабе `/cities/`; 15 фото — cover + 6 инлайн + 8 gallery, все CC Wikimedia; HotelWidget вкл.). Коллекции `cities`/`routes`/`restaurants`/`services` — пусты (по дизайну; город = статья `category=cities`).
- **Бренд:** favicon + иконки = флаг Черногории; hero-кадры и og-default = Черногория; флаг в шапке `me-flag.svg`; адриатическая палитра.
- **Инфраструктура:** `/go/` (worker/index.ts + wrangler.jsonc + partners.json) работает; sitemap + robots; GA4 `G-MMFK991W8V`.
- **Запуск:** домен `montenegroguidebook.com` куплен, подключён, **сайт онлайн**; GSC добавлен, sitemap подан.

## Сделано (последнее)
- **Статья-СТОЛИЦА Podgorica** (KALENDAR W2, `/cities/podgorica-travel-guide/`): тройка en/ru/uk, ~1410 слов (en), структура города (лид → стоит ли ехать → что посмотреть → районы/где жить → как добраться TGD/Котор/побережье → еда → практика), 15 фото CC Wikimedia (webp ≤200КБ), HotelWidget + AffiliateBox car-rental (trip-carhire EN / localrent CIS), 4+ внутр. ссылки + хаб /cities/. Гейты GO.
- Этап 1: тех-аудит (`AUDIT-2026-06-22.md`), дочистка грузинских следов (код/скрипты/`.claude`/`/news`), болванки EN-партнёрок, локализация `/news`, адаптация `SETUP-GUIDE`, стандарты+дисциплина в `CLAUDE.md`, наполнение `docs/memory/MEMORY.md`, deliverable-доки.
- Ранее: первый кластер 5 статей; favicon-флаг; GA4; перенос языка в меню; `kwd=Georgia→Montenegro`; домен+деплой.

## Открыто (см. `ROADMAP-FIX.md`)
- Фото-добор ≥5 (поздний этап); EKTA/EN-партнёрки (регистрация владельца); перф главной (опц.); дальнейший контент; GSC Request Indexing / GA Realtime (владелец).
