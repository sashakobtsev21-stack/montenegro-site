# Memory index — Montenegro Guidebook

> Проектная память montenegro-site (зеркало авто-памяти): ключевые решения и грабли по этому репо. Грузинская память движка-донора — в архиве `docs/_georgia-reference/memory/` (не редактировать).

## Ключевые решения (с датами)

- **Гео/язык (РЕШЕНО):** EN-first, Tier-1 (Запад) — первичны; ru — крепкий вторичный рынок. Языки en (корень) / ru (`/ru/`); **uk удалён 2026-06-22** (старые /uk/-URL → 301 на корень). Один slug в паре, паритет числовых фактов, взаимные hreflang en↔ru + x-default=en. Подбор тем — от EN-интента. (`docs/STRATEGY.md`)
- **Валюта — евро €** (у Черногории евро без собственного ЦБ): цены в €, в новостях «курс» не отслеживаем.
- **Движок:** Astro 6.4.6 static/SSG + Tailwind 4 + Leaflet; хостинг Cloudflare Workers (Static Assets); деплой = push в `main`. Без React/CMS/БД.
- **Монетизация `/go/`:** роут `worker/index.ts` читает `src/data/partners.json`, подставляет `?c={slug}` как SubID, 302 на target; неизвестный партнёр/невалидный target → безопасный фолбэк на свой сайт (анти-open-redirect); `/go/` исключён из sitemap (`astro.config.mjs`). Только через `/go/` + `rel="sponsored nofollow noopener"`.
- **Город = статья `category=cities`** (английский слаг). Коллекция `cities` НЕ используется (пуста во всех форках). Коллекции движка: `articles`, `routes`, `cities`, `restaurants`, `services`.
- **Гео-таксономия (РЕШЕНО 2026-06):** регионы — 3 макрорегиона `coastal`/`central`/`northern` (MONSTAT); базовые города — Podgorica/Budva/Kotor/Tivat/Herceg Novi/Bar/Ulcinj/Cetinje/Nikšić/Žabljak/Kolašin; accessFrom — Podgorica(TGD)/Tivat(TIV)/Budva; города директории еды — Budva/Kotor/Podgorica. Менять — синхронно `content.config.ts` + `i18n/types.ts` + словари (гейт `check-enums`).
- **Новости (механика движка — не трогать):** окно раздела 10 дней (`NEWS_SECTION_WINDOW=10`), блок на главной 2 дня (`NEWS_HOME_WINDOW=2`), ежедневный rebuild (`daily-news-rebuild.yml`). Локализован только ТЕКСТ скилла `/news`.
- **Источники `/news` (Черногория):** Total Montenegro News, Vijesti (EN), CdM/Cafe del Montenegro (EN), Balkan Insight; офиц. — gov.me, МВД (MUP), аэропорты Тиват/Подгорица (montenegroairports.com), хаб въезда Дубровник (DBV). Правит только владелец.
- **Аналитика:** GA4 `G-MMFK991W8V` (2026-06-21) — единственная (правило 8); внешний self-скрипт + CSP, данные только с прод-домена. Cloudflare Web Analytics не используется.
- **Домен:** `montenegroguidebook.com` — куплен, подключён к воркеру Cloudflare, сайт онлайн; GSC добавлен, sitemap подан.
- **Бренд:** favicon/иконки = флаг Черногории; hero-кадры и og-default = Черногория; адриатическая палитра (имена CSS-переменных `--color-wine/--color-sun` исторические, несут новые цвета).
- **Дисциплина (правило владельца):** после каждой доработки — обновить доки + commit + push в `main`. Память `always-commit-push-and-update-docs`.

## Грабли
- **Даты в новостях:** числа/даты только из источника ТЕКУЩЕГО года; для ежегодных событий прошлогодние даты не копировать (был прокол на движке-доноре).
- **Wikimedia rate-limit (429):** при массовой загрузке фото — thumbnail-URL (`?width=1600`) + задержки; webp ≤200 КБ писать буфером напрямую (не переэнкодить уже сжатое).

<!-- Формат строки индекса (если заводить отдельные файлы памяти):
- [Заголовок](file-slug.md) — короткий хук, что внутри
-->
