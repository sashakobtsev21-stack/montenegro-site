# HANDOFF — montenegro-site

_Обновлено: 2026-06-22 — **Опубликована статья-ПЛАНИРОВАНИЕ `how-many-days-in-montenegro`** «How Many Days in Montenegro? (+ Is It Worth Visiting)» (`category=planning`, `/planning/how-many-days-in-montenegro/` + `/ru/…`): пара en/ru, ~1695/1448 слов, лид = прямой ответ (мин. 3–4 дня, идеал 5–7), разделы стоит-ли-ехать / сколько дней по интересам (таблица) / планы 3·5·7 дней / когда ехать / как добраться, без FAQ; 6 уникальных CC-webp ≤200КБ (cover + 5 инлайн); перелинк на маршрут `bay-of-kotor-coast` + guide/best-time/Котор/Подгорица/car-rental + хаб `/planning/`; добавлена в `showcasePicks` (sight). `npm run qa` = GO. Примечание: `category=planning` валидна в `content.config.ts`, но скаффолдер `new-content.mjs` его НЕ знает (старый enum) — статья создана вручную по образцу planning-статей. Ранее: МАРШРУТ `bay-of-kotor-coast` (геометрия OSRM, `build-route-geometry.mjs` читает coord из `routes/ru/`), крутилка витрины (ShowcaseRail), город Budva, витрина (Podgorica+Kotor), удалён uk (en+ru), 2 новости, города Podgorica (столица) и Kotor._

Краткий ввод для следующей сессии/ассистента. Подробности — `SPEC.md` (продукт), `CLAUDE.md` (правила), `CONTENT_GUIDE.md` (как писать), `AUDIT-2026-06-22.md` (аудит), `ROADMAP-FIX.md` (что чинить), `PROGRESS.md` (снимок).

## С чего начать
1. Прочитай `CLAUDE.md` + `SPEC.md`. Правило дисциплины: после **каждой** доработки — обновить доки + `git commit` + `git push` в `main` (push = деплой).
2. Прогон перед работой: `npm run qa` (должен быть **GO**).

## Что важно знать
- **EN-first**, языки en/ru (uk удалён 2026-06-22), slug одинаков в обоих, паритет числовых фактов + взаимные hreflang (en↔ru, x-default=en). Валюта — **евро €**.
- **Город = статья `category=cities`** (английский слаг; коллекция `cities` НЕ используется — пуста во всех форках).
- **Партнёрки только через `/go/{partner}?c={slug}`** (`rel="sponsored nofollow noopener"`); прямые URL запрещены. Карта — `src/data/partners.json`, роут — `worker/index.ts`.
- **Новости** (`/news`): механика движка (окно раздела 10 дн, блок главной 2 дн, ежедневный rebuild) — **не трогать**; текст скилла локализован под Черногорию.
- **Архив `docs/_georgia-reference/`** — образец-донор, не редактировать и не удалять.

## Что НЕ делать без явного запроса
- Массовая генерация контента; SEO-стратегия/ключи; редизайн (цвета/анимации — отдельный чат); смена URL без 301 в `public/_redirects`; изменение контент-модели/enums без синхронной правки `content.config.ts` + `i18n/types.ts` + словарей (гейт `check-enums`).

## Открытые задачи
`ROADMAP-FIX.md`: фото-добор ≥5; EKTA/EN-партнёрки (регистрация владельца); перф главной (опц. hero-preload); дальнейший контент. Действия владельца: GSC Request Indexing, GA4 Realtime.
