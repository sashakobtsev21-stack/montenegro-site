---
name: photo-audit-sitewide
description: Пайплайн фото-аудита всего сайта (агенты photo-auditor + photo-upgrade-researcher) — как прогнать оценку всех фото и заменить слабые
metadata:
  type: project
---

**Запрос владельца (2026-06-19):** пройтись по ВСЕМ статьям, оценить фото, найти лучше; сначала подготовить для оценки; разбить на группы; создать агентов. Сделано — аудит всех 124 материалов, заменено ~37 фото в ~30 статьях.

**Созданы 2 проектных агента** (`.claude/agents/`, коммит c5a9c6c): **photo-auditor** (смотрит текущие фото через Read, вердикт keep/improve/replace + EN-запрос; только оценка) и **photo-upgrade-researcher** (по флагам ищет кандидатов Unsplash/Commons, собирает контактные листы в `_scratch/photoaudit/candidates/<slug>.png` + манифест `<slug>.json`; не пишет в контент). Регистрируются на СТАРТЕ сессии — созданные в середине сессии в этой же сессии недоступны (используй `general-purpose` со встроенным брифом до перезапуска).

**Пайплайн (фазы):**
1. **Инвентаризация** — `_scratch/photoaudit/inv.mjs` парсит все `src/content/{articles,routes,restaurants,cities,services}/ru/*.md` → группы/cover/gallery/inline → `inventory.json`. Группы: достопримечательности 31, еда 27, развлечения 16, города 10, маршруты 9, транспорт 6, аренда 5, новости 5, релокация/планирование/услуги 3, страховка 1.
2. **Контактные листы текущих обложек** по группам (`sheets.mjs`) — владелец оценивает + я флагаю.
3. **Аудит** — фан-аут photo-auditor по группам (батчи ~10–16, читают КАЖДОЕ фото в полном размере). Лимит субагентов сбрасывается (был ~14:30 Тбилиси) — если упало, ждать/пейсить.
4. **Источники** — photo-upgrade-researcher по флагам → контактные листы кандидатов (первая ячейка = текущее) → владелец одобряет номера / я рекомендую.
5. **Сборка** — `buildall.mjs`: Commons (`full` или вывод оригинала из `thumb`: `/commons/thumb/.../1280px-X`→`/commons/.../X`) / Unsplash (trigger `dl` + `raw&w=1600`); sharp cover 1280×718, степпинг качества + ширины до ≤200КБ. Обложки → `/images/<slug>/cover.webp` (НЕ перезаписывать плоские `/images/<slug>.webp` — часто общие: напр. `/images/batumi.webp` — это обложка новости о сносе; `/images/kutaisi.webp` делят 3 статьи). Инлайн/галерею — перезапись файла на месте + правка alt/credit.
6. **Прошивка** — заменить cover-блок (`cover:\n  src\n  alt\ncoverCredit`) и галерейные записи; коллекция: routes/restaurants/articles. build:covers → qa GO → коммит группами.

**Грабли (важно):**
- **Лучшая замена часто УЖЕ в галерее** статьи (gN) — поднять в обложку без поиска (Batch 1: jvari/gergeti/most-mira/rabati/narikala/okatse/uplistsikhe/ushguli; коммит ee2c0a6). Смысловые ошибки: jvari = интерьер вместо силуэта, gergeti = купол без Казбека.
- **Апостроф в alt ломает YAML** (одинарные кавычки): нельзя `alt: 'Telavi's ...'` — перефразировать без `'` или удваивать `''`.
- **CRLF/LF**: регэксп по frontmatter — `\r?\n`, не `\n` (часть файлов CRLF после sed).
- **String.replace(fn)**: при 3 группах параметры `(m,p1,p2,p3)` — 4-й это OFFSET (число!), не группа. Не приписывать `d`/offset вместо закрывающей кавычки (побил кредиты, чинил откатом).
- **Unsplash для грузинской специфики/блюд почти пуст** (khinkali→дим-самы, qvevri/nazuki/lobiani = 0) → Commons; Unsplash силён на generic plated dishes / road trips / wine pour.
- **delfinariy**: alt'ы галереи разошлись с файлами — слабый «ржавый понтон» физически = g10 (не g5); проверять файлы, не alt.

**`surami-nazuki` — закрыто (владелец выбрал «в», коммит e251261):** была чурчхела (ошибка темы), фото назуки в CC нет → жанровая обложка-иллюстрация свежей выпечки (Sergio Arteaga / Unsplash, без брендинга — внимание: у многих «bakery» Unsplash-кадров вшит текст Princi/Starbucks Reserve, брать чистый хлеб-кадр), `coverIllustrative`. См. [[restaurant-photos-illustrative]], [[article-photos-unique]], [[photo-pipeline-hybrid]], [[map-coords-verification]].
