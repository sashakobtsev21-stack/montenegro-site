# HANDOFF — montenegro-site

_Обновлено: 2026-06-22 — **УДАЛЁН украинский язык (uk)**: сайт теперь en (корень) + ru (`/ru/`). Снято дерево `src/pages/uk/`, uk-контент во всех коллекциях, словарь `i18n/uk.ts`, агент `uk-translator`; hreflang/x-default только en↔ru; sitemap → en,ru; `check-parity` теперь требует пару en+ru; добавлен 301 `/uk/* → корень` в `public/_redirects`. Гейты build/check/test/test:links/lint — все зелёные (55 страниц). Ранее: 2 новости (`exit-festival-montenegro-2026`, `montenegro-airports-summer-2026`), города `podgorica-travel-guide` (столица) и `kotor`._

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
