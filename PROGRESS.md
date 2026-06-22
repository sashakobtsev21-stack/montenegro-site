# PROGRESS — montenegro-site

Снимок прогресса. Обновлять после каждой доработки (правило дисциплины, `CLAUDE.md`).

_Обновлено: 2026-06-22 (опубликованы 2 НОВОСТИ — `exit-festival-montenegro-2026` и `montenegro-airports-summer-2026`, тройки en/ru/uk, фото CC, `npm run qa` = GO)._

## Состояние (факт)
- **Движок:** Astro 6.4.6 static/SSG, Tailwind 4, Leaflet; деплой Cloudflare Workers (push в `main` = деплой). Сборка 70 страниц, `npm run qa` = **GO**.
- **Языки:** en (корень) / ru (`/ru/`) / uk (`/uk/`), EN-first.
- **Контент:** 7 статей × 3 языка — `montenegro-travel-guide`, `best-time-to-visit-montenegro`, `renting-a-car-in-montenegro`, `cost-of-living-in-montenegro`, `durmitor-national-park` (каждая cover + 3 инлайн-фото), **`podgorica-travel-guide`** (СТОЛИЦА, `category=cities`; 15 фото) и **`kotor`** (ГОРОД, `category=cities`, `/cities/kotor/`; 13 фото — cover + 7 инлайн + 6 gallery, все CC Wikimedia; HotelWidget вкл.). Коллекции `cities`/`routes`/`restaurants`/`services` — пусты (по дизайну; город = статья `category=cities`).
- **Бренд:** favicon + иконки = флаг Черногории; hero-кадры и og-default = Черногория; флаг в шапке `me-flag.svg`; адриатическая палитра.
- **Инфраструктура:** `/go/` (worker/index.ts + wrangler.jsonc + partners.json) работает; sitemap + robots; GA4 `G-MMFK991W8V`.
- **Запуск:** домен `montenegroguidebook.com` куплен, подключён, **сайт онлайн**; GSC добавлен, sitemap подан.

## Сделано (последнее)
- **2 НОВОСТИ** (`/news/`, одобрены владельцем; тройки en/ru/uk, `category=news`, draft:false, гейты GO):
  - **`exit-festival-montenegro-2026`** (`/news/exit-festival-montenegro-2026/`): EXIT привозит 2 бесплатных фестиваля на побережье летом 2026 — Long Beach Edition в Улцине 3–6 июля и Sea Dance Edition на пляже Бечичи у Будвы 28–31 августа; лайнап Charlotte de Witte / Peggy Gou / Jamie Jones / Maceo Plex; вход бесплатный по предв. регистрации. 2 фото CC (cover — пляж Бечичи, Daniya.Mostovaya CC BY-SA 4.0; инлайн — Велика-Плажа Улциня, miketnorton CC BY 2.0, обе как иллюстрации места). 6 внутр. ссылок (вкл. `/cities/kotor/`), AffiliateBox trip-tours (EN) / localrent (ru-uk) через `/go/`. Источник: BroadwayWorld (09.06.2026).
  - **`montenegro-airports-summer-2026`** (`/news/montenegro-airports-summer-2026/`): аэропорты Подгорица TGD и Тиват TIV летом 2026 — 60+ прямых направлений (Барселона/Берлин/Вена/Париж/Лондон/Рим/Тель-Авив; Тиват — Лондон/Манчестер/Амстердам/Мюнхен/Дубай); перевозчики Lufthansa, BA, easyJet, Ryanair, Wizz Air, Air Montenegro. 2 фото CC (cover — перрон Тивата, Network Aviation CC BY-SA 4.0; инлайн — терминал Подгорицы, Rakoon CC0). 5 внутр. ссылок (вкл. `/cities/kotor/`), AffiliateBox trip-flights (EN) / aviasales (ru-uk) через `/go/`. Источник: CdM (08.06.2026).
- **Статья-ГОРОД Kotor** (KALENDAR W1, `/cities/kotor/`): тройка en/ru/uk, ~1600 слов (en), `category=cities` + `region: coastal`, структура города (лид → стоит ли ехать → что посмотреть: Старый город ЮНЕСКО / стены + крепость Сан-Джованни / собор Св. Трифона / Бока → дейтрипы Пераст + Госпа-од-Шкрпела → где жить → как добраться Tivat TIV / Подгорица / Дубровник + паром Каменари–Лепетане → где поесть → практика, без FAQ). 13 фото CC Wikimedia (webp ≤200КБ, cover + 7 инлайн + 6 gallery, отобраны глазами). HotelWidget + AffiliateBox trip-hotels + trip-tours (через `/go/`). Перелинк: Подгорица, Montenegro guide, best-time, Durmitor, аренда авто, хаб /cities/. Факты сверены (1350 ступеней/~260 м/4.5 км стен; паром Каменари–Лепетане через пролив Вериге). Гейты GO.
- **Статья-СТОЛИЦА Podgorica** (KALENDAR W2, `/cities/podgorica-travel-guide/`): тройка en/ru/uk, ~1410 слов (en), структура города, 15 фото CC Wikimedia (webp ≤200КБ), HotelWidget + AffiliateBox car-rental, 4+ внутр. ссылки + хаб /cities/. Гейты GO.
- Этап 1: тех-аудит (`AUDIT-2026-06-22.md`), дочистка грузинских следов (код/скрипты/`.claude`/`/news`), болванки EN-партнёрок, локализация `/news`, адаптация `SETUP-GUIDE`, стандарты+дисциплина в `CLAUDE.md`, наполнение `docs/memory/MEMORY.md`, deliverable-доки.
- Ранее: первый кластер 5 статей; favicon-флаг; GA4; перенос языка в меню; `kwd=Georgia→Montenegro`; домен+деплой.

## Открыто (см. `ROADMAP-FIX.md`)
- Фото-добор ≥5 (поздний этап); EKTA/EN-партнёрки (регистрация владельца); перф главной (опц.); дальнейший контент; GSC Request Indexing / GA Realtime (владелец).
