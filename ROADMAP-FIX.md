# ROADMAP-FIX — montenegro-site

Приоритизированный список исправлений из аудита (`AUDIT-2026-06-22.md`) и решений Этапа 1. Что **не делаем сейчас**, но фиксируем, помечено явно. Снимать галочку — только когда сделано + закоммичено.

**Легенда приоритета:** 🔴 High · 🟡 Medium · ⚪ Low. (Critical в аудите нет.)

---

## Контент (поздние этапы — Этап 1 не наполняет)
- [x] 🟡 **Добор фото до ≥5** по статьям, где сейчас <5 — **сделано (2026-06-30)**. Прошёл по всем 29 статьям, реально дефицитными (cover + 3 инлайн = 4) оказались 6 статей: `best-time-to-visit-montenegro`, `cost-of-living-in-montenegro`, `durmitor-national-park`, `montenegro-entry-requirements`, `montenegro-travel-guide`, `renting-a-car-in-montenegro`. Каждая добрана +1 инлайн-`<figure>` (CC/PD с Wikimedia, webp ≤200 КБ, уникальный кадр по теме, атрибуция автор/лицензия) → cover + 4 = **5 фото**, en/ru паритет. Остальные 23 статьи уже ≥5 (не тронуты). 7 материалов `category:news` остаются на cover+1=2 — это норма новостей (≥2), а не статей. Гейт `check-photos` пока требует cover + ≥3 инлайн; ужесточение гейта до ≥5 — отдельным шагом.
- [ ] ⚪ Дальнейший контент по `docs/CONTENT_PLAN.md`: `montenegro road trip itinerary`, города `kotor`/`budva`, `montenegro travel insurance`, `things to do / bay of kotor` — до плотности 8–10 троек.

## Монетизация (действие владельца → потом код)
- [ ] 🟡 **EKTA** — вступить в программу (Travelpayouts), прислать рабочую трекинг-ссылку → вернуть атрибуцию в `partners.json` (`allowSubId:true` + `?sub_id={subid}`). Сейчас прямой URL без атрибуции.
- [ ] 🟡 **EN-партнёрки** DiscoverCars / GetYourGuide(Viator) / Booking — зарегистрироваться → вставить трекинг-ссылки в болванки `partners.json` (сейчас прямой URL без атрибуции).

## Перформанс
- [ ] ⚪ **Главная perf 89** (Lighthouse mobile) — опц. `preload` hero-LCP-картинки (вероятный +2–3 балла). Не блокер.

## Безопасность
- [ ] ⚪ Квартально мониторить `npm audit` (dev — 24 уязвимости в tooling; prod — чисто).

## Доступность (a11y)
- [x] 🟡 **B1 — адаптивные контентные таблицы** (анти-overflow на мобайле) — **сделано (2026-06-30)**. Движок общий с эталоном Грузии; в контенте 48 md-файлов содержат широкие md-таблицы (напр. `cost-of-living-in-montenegro` — 3 колонки), которые на узких экранах раздвигали страницу → горизонтальный скролл всего документа. Фикс — чисто CSS в `src/styles/global.css`: `.prose table { display:block; max-width:100%; overflow-x:auto; -webkit-overflow-scrolling:touch; }` (таблица скроллится внутри своей колонки, лэйаут не ломается). `.prose` используется в ArticlePage/RoutePage/InsuranceHub — глобальное правило покрывает все. В `scripts/qa-responsive.mjs` в список проверяемых страниц добавлена контентная статья с широкими таблицами (`/relocation/cost-of-living-in-montenegro/`), чтобы фикс реально проверялся. `qa:responsive`=GO (0 переполнений, 9 шаблонов × 5 ширин 320/360/414/768/1280), qa=GO, test:links=GO. Паритет en↔ru не затронут (правка только CSS).

## Доступность (a11y) — продолжение
- [x] 🟡 **a11y-серия портирована** (gruzia `284cb30`) — **сделано (2026-06-30)**. Движок общий с эталоном Грузии, баги те же → перенесён эквивалент 11 фиксов: разные `aria-label` у двух `<nav>` (выпадающее меню → `menuNav` «All sections»/«Все разделы»); уникальные `id` per-instance в PhotoGallery/RelatedPosts/TOC/VisitInfo (aria-labelledby не коллизит при двух блоках на странице); контраст стрелок витрины `.scard__nav` (slate 60% + белая обводка 40%, hover 78%, WCAG 1.4.11); имя диалога-лайтбокса = назначение «Photo viewer»/«Просмотр фотографии», не «Закрыть» (WCAG 4.1.2, через `data-dialog-name` в PhotoGallery/RestaurantCard/ShowcaseRail + `lightbox.js`); Esc-закрытие поповера витрины + возврат фокуса (`showcase-rail.js`); `aria-label` на `.gallery__item` (ключ `gallery.open`); фокус-кольцо-пилюля `.cmap__btn`/`.hero__credit`; видимый skip-link при фокусе (бренд-токен `--color-wine` = адриатический teal); тач-таргеты ≥44px (чипы `/eda/` директории + переключатель языка en/ru); `noindex, nofollow`→`noindex, follow` (код к JSDoc); резерв витрины 198px→188px. i18n обновлён для en+ru (uk нет). qa=GO, test:links=GO, паритет en↔ru цел.

---

## Действия владельца (вне кода)
- [ ] **GSC: Request Indexing** главной + ключевых статей (ускорит индексацию и favicon в выдаче).
- [ ] **GA4 Realtime** — открыть сайт без блокировщика, убедиться, что тег ловит визит.
- [ ] (опц.) Связать **GSC ↔ GA4** (GA Admin → Product links).

## Закрыто на Этапе 1 (не pending — для протокола)
- [x] **Домен `montenegroguidebook.com`** — куплен, подключён к воркеру Cloudflare, **сайт онлайн** (исходно ТЗ считало плейсхолдером — устарело).
- [x] **Google Search Console** — домен добавлен; **sitemap** подан (`sitemap-index.xml`; ждём обхода Google, карта валидна).
- [x] **Hero-ассеты `src/assets/hero/*.jpg` и `public/og-default.jpg`** — **уже черногорские** (проверено: `kotor-bay` = Которский залив, og-default = Котор). Исходное предположение ТЗ о «грузинских плейсхолдерах» — устарело. Замена НЕ требуется.
- [x] **favicon** — флаг Черногории (был грузинский).
- [x] **Инфраструктура `/go/`** (worker/wrangler/partners.json) — существует и работает.
- [x] **Грузинские следы** в коде/скриптах/`.claude`/`/news` — вычищены.
- [x] **`SETUP-GUIDE.md`** — адаптирован под montenegro-site (пути, репо, ремоут).
