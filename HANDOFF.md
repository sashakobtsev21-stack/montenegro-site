# HANDOFF — montenegro-site

_Обновлено: 2026-06-22 — **Витрина ShowcaseRail переведена на чистую CSS-крутилку v2** (спека `_fixes/showcase-marquee-fix.md`): движение перенесено с JS (`scrollLeft`+rAF) на CSS-анимацию в самом компоненте — непрерывная бесшовная петля, не зависит от кэша `/js/showcase-rail.js`. `ShowcaseRail.astro`: 2 копии набора в разметке + `.showcase__track { animation: showcase-marquee var(--showcase-dur,60s) linear infinite }` + `@keyframes showcase-marquee` (translateX 0→-50%) + пауза на hover/focus + reduced-motion fallback (`animation:none`, `overflow-x:auto`); `.showcase__viewport { overflow:hidden }`. `public/js/showcase-rail.js` сведён к минимуму (28 строк): задаёт `--showcase-dur` ∝ ширине набора + тач-тап по карточке-заведению (без drag/scrollLeft/rAF). Гейты: build (61 стр.), check (0/0), test (enums/parity/photos/interlinks), test:links (3201, 0 битых), lint — все зелёные; в `dist/` (`/` и `/ru/`) подтверждены animation/keyframes/overflow:hidden/пауза/2 копии. Примечание: scoped-CSS компонента уезжает в `_astro/HomePage.*.css` (штатно для Astro), а не в инлайн `<style>` — линкуется из `<head>` обеих страниц. Ранее: статья-ПЛАНИРОВАНИЕ `how-many-days-in-montenegro`, МАРШРУТ `bay-of-kotor-coast`, город Budva, витрина (Podgorica+Kotor), удалён uk (en+ru), 2 новости, города Podgorica (столица) и Kotor._

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
