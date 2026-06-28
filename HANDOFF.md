# HANDOFF — Montenegro Guidebook
> Снимок для возобновления (обновляется после каждой доработки). Подробная история — `PROGRESS.md`; план — `ROADMAP.md`/`KALENDAR.md`; аудит — `AUDIT.md`.

**Дата:** 2026-06-29 · **Фаза:** R4 наполнение · **Статей:** ~24 (цель ~80) · **Сайт:** live (`montenegroguidebook.com`) · **Языки:** en/ru · **Последний коммит:** `17e7d73 docs(montenegro): refresh ROADMAP -- R4 content-fill phase (24->~80, until 31.07), blockers`

## Где остановились
- Контент: последние опубликованные (28.06) — `montenegro-entry-requirements` (planning/YMYL: въезд/виза/ETIAS) и `best-beaches-in-montenegro` (attractions, head-term пляжного кластера). Полный лог — `PROGRESS.md`.
- Календарь вычищен: будущие даты = только `○` к написанию (выполненного на будущих датах нет); план до 31.07; темп 3/будний день; маршруты по Вс.
- Сеть: доки выровнены (ядро 12/12, добавлен AUDIT.md); дашборд `grafana/dashboard.html` актуален; `/work` публикует автономно при полной уверенности.

## Что дальше
- Темы из `KALENDAR.md` на ближайшие дни (побережье/Котор/Будва, транспорт, релокация). SEO-актуализация по GSC ~06.07.

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
