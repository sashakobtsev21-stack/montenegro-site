# HANDOFF — Montenegro Guidebook
> Снимок для возобновления (обновляется после каждой доработки). Подробная история — `PROGRESS.md`; план — `ROADMAP.md`/`KALENDAR.md`; аудит — `AUDIT.md`.

**Дата:** 2026-06-30 · **Фаза:** R4 наполнение · **Статей:** ~27 (цель ~80) · **Сайт:** live (`montenegroguidebook.com`) · **Языки:** en/ru · **Последний коммит:** `plan(montenegro): ramp to 3 articles/weekday through July`

## Где остановились
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
