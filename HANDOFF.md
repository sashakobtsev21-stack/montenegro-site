# HANDOFF — Montenegro Guidebook
> Снимок для возобновления (обновляется после каждой доработки). Подробная история — `PROGRESS.md`; план — `ROADMAP.md`/`KALENDAR.md`; аудит — `AUDIT.md`.

**Дата:** 2026-06-30 · **Фаза:** R4 наполнение · **Статей:** 29 + 3 маршрута (цель ~80) · **Сайт:** live (`montenegroguidebook.com`) · **Языки:** en/ru · **Последний коммит:** `fix(montenegro): a11y series ported from engine (nav labels, unique ids, carousel/lightbox/skip-link/touch-targets/focus-ring/noindex)`

## Где остановились
- **a11y-серия портирована с движка Грузии (30.06, `fix`, en+ru, qa=GO, test:links=GO):** эталон `gruzia 284cb30` (движок общий → баги те же). Перенесён эквивалент 11 a11y-фиксов: разные `aria-label` у двух `<nav>` (выпадающее меню → `header.menuNav`); уникальные per-instance `id` в PhotoGallery/RelatedPosts/TOC/VisitInfo (aria-labelledby не коллизит); контраст стрелок витрины `.scard__nav` (slate 60% + белая обводка, hover 78%); имя диалога-лайтбокса = «Photo viewer»/«Просмотр фотографии» (`data-dialog-name`+`lightbox.js`); Esc-закрытие поповера витрины + возврат фокуса (`showcase-rail.js`); `aria-label` на `.gallery__item` (`gallery.open`); фокус-кольцо-пилюля `.cmap__btn`/`.hero__credit`; видимый skip-link (бренд-токен `--color-wine` = teal этого репо); тач-таргеты ≥44px (чипы `/eda/` + переключатель языка en/ru); `noindex,nofollow`→`noindex,follow`; резерв витрины 198→188px. i18n — только en+ru (uk нет). Гейты qa=**GO**, test:links 6172 ссылки 0 битых, паритет en↔ru цел. Записано в `ROADMAP-FIX.md` (раздел «Доступность (a11y)»).
- **Добор фото до ≥5 (30.06, `content`, qa=GO):** закрыт пункт `ROADMAP-FIX.md` → «Контент». Из 29 статей реально дефицитными (cover+3=4) были 6: `best-time-to-visit-montenegro`, `cost-of-living-in-montenegro`, `durmitor-national-park`, `montenegro-entry-requirements`, `montenegro-travel-guide`, `renting-a-car-in-montenegro`. В каждую (en+ru, паритет) добавлен +1 уникальный инлайн-`<figure>` из реальных CC/PD-кадров Wikimedia (webp ≤200 КБ, атрибуция автор/лицензия) → 5 фото. News-материалы (cover+1=2) не трогались — норма новостей. Гейты: qa=**GO**, test:links 0 битых.
- Чистка доков/мусора (30.06): удалён рабочий кэш `scratchpad/photos/` (18 untracked webp, не в сборке), `scratchpad/` добавлен в `.gitignore`. `ROADMAP-FIX.md` — убраны дубли закрытых `[x]` (домен/sitemap теперь один раз в «Закрыто»), пункт «добор фото» переписан под реальность (29 статей + 3 маршрута, без неверного «5 статей»). `ROADMAP.md` счётчик `~27` → `29 + 3 маршрута`. `docs/CONTENT_PLAN.md` ужат: убраны врущие статус-колонки и §11 «Стартовая очередь», оставлена реюзабельная справка (кластеры, целевые EN-запросы, денежные связки). KALENDAR.md не тронут. Активные пункты FIX (EKTA/EN-партнёрки/GSC) не тронуты.
- Контент: слоты Пн 29.06 опубликованы (en+ru, qa=GO, test:links=GO): `getting-around-montenegro` (transport, head-page хаба), `montenegro-road-trip` (routes, 7 фото/остановок, геометрия запечена), `tivat-airport-to-kotor` (transport, аэропорт→город). Все фото — CC c атрибуцией+sourceUrl, цены — диапазоны 2026 + «уточняйте». Починена битая перелинковка ru `getting-around` (ссылки → `/ru/...`). Предыдущие (28.06): `montenegro-entry-requirements`, `best-beaches-in-montenegro`. Полный лог — `PROGRESS.md`.
- Календарь вычищен: будущие даты = только `○` к написанию (выполненного на будущих датах нет); план до 31.07; темп 3/будний день; маршруты по Вс. **Темп 3/будень добит до полного покрытия 01–31.07 (30.06):** недоставало только Ср 01.07 (было 2 из-за FOLDED dubrovnik-to-kotor) → добавлена `podgorica-airport-to-budva` (transport). Теперь все 23 будня июля = 3 ○-темы (сверено скриптом).
- Сеть: доки выровнены (ядро 12/12, добавлен AUDIT.md); дашборд `grafana/dashboard.html` актуален; `/work` публикует автономно при полной уверенности.

## Что дальше
- Слоты Вт 30.06 (`KALENDAR.md` W2): Kotor↔Dubrovnik (трансфер/граница), Kotor↔Budva (bus/taxi/driving), Driving in Montenegro — все сателлиты getting-around-хаба (опубл.), перелинковать на него. Дальше транспорт/where-to-stay по плану. SEO-актуализация по GSC ~06.07.

## Блокеры владельца
- GSC: Request Indexing + дождаться обработки sitemap. Партнёрки (Travelpayouts: DiscoverCars/GetYourGuide/Booking + починить EKTA-атрибуцию). Моат-решение (владелец не в стране). Дисплей-реклама (рек.: старт без).

## Не ломать (уже работает)
- Механика **новостей** (`/news`): окно раздела 10 дн, блок главной 2 дн, ежедневный rebuild — не трогать.
- Партнёрки только через `/go/{partner}?c={slug}` (`rel="sponsored nofollow noopener"`); карта — `src/data/partners.json`, роут — `worker/index.ts`. Прямые URL запрещены.
- Enums гео = 3 макрорегиона (`coastal`/`central`/`northern`); менять только синхронно `content.config.ts` + `i18n/types.ts` + словари (гейт `check-enums`).
- Город = статья `category=cities` (коллекция `cities` пуста по дизайну). hero/og-default + favicon = Черногория. URL не менять без 301 в `public/_redirects`.

## Команды
- `npm run qa` — финальный GO/NO-GO (сборка + гейты + аудит `dist/`); `npm run test:links` — внутр. ссылки и `/go/`.
- `npm run new -- <тип> <slug> --title "…"` — скелет en/ru + папка фото + DoD.
- Скиллы: `/work` (утренний дирижёр), `/news`, `/content`, `/add-content`, `/full-audit`.
