---
name: qa-gate
description: npm run qa — финальный GO/NO-GO гейт сайта (статический аудит dist) + грабля getImage .src (отдаёт оригинал, если не капнуть width)
metadata:
  type: project
---

`npm run qa` (`scripts/qa.mjs`, ROADMAP #21, добавлен `e7fbdb1`) — финальный QA-оркестратор: запусти перед тем как объявлять работу готовой.

**Что делает:** чистит `dist` (rmSync — чтобы совпадать с чистой CI-сборкой Cloudflare; иначе orphan-ассеты из кэша Astro дают ложные срабатывания) → гейты (check/build/test/links/lint) → статический аудит `dist/`:
- SEO: title ≤60 без суффикса « — Georgia Guidebook», description, ровно 1 canonical, og:image — **длину считает с декодом HTML-сущностей** (`&amp;` иначе раздувает счётчик);
- взаимность hreflang (+ x-default), форма `@graph` в JSON-LD;
- доступность: нет alt → critical, пустой alt → minor (декоративные — флаг/hero/витрина по дизайну с пустым alt, это норма), один h1;
- перф: JS ≤50КБ/стр; картинки ≤200КБ **только реально подключённые** (src/srcset), не весь dist;
- render-smoke (нет `TODO`/`undefined`/`[object Object]` в видимом тексте), безопасность (CSP без `unsafe-inline` в script-src; нет inline `on*=`/`javascript:`);
- `npm audit`: prod-дерево high/critical = **medium-инфо**, НЕ блокирует GO (это build-tooling esbuild/vite через Astro — в задеплоенную статику не входит, фикс только мажором; известное состояние); dev-уязвимости — инфо-строкой.
Отчёт: critical / medium / minor + **GO/NO-GO** (NO-GO при любом critical). **Текущий статус: GO** (0 critical; 1 medium = npm audit build-tooling инфо; ~321 минор = декоративные пустые alt, by design — не править).

**Гейт `npm test`** = check-enums + check-parity + check-photos + **check-interlinks** (добавлен 2026-06-17): DoD «≥2 внутр. ссылки в теле статьи/маршрута» (markdown `](/…)` + raw `<a href>`, без `/go/`, дедуп; draft скип). WARN-режим по умолчанию (как check-photos), `--strict` валит сборку. Что НЕ добавлял и почему: axe/pa11y — избыточно (Lighthouse в `qa:browser` на axe-core, включая контраст); check-redirects — уже в `check-links.mjs` (резолв путей + сверка `/go/{partner}` с partners.json); check-contrast — низкий ROI (рантайм у axe; реальная грабля была не контраст, а несуществующие токены, см. [[visual-check-and-space-tokens]]).

**Браузерный слой (D8 ✅):** `npm run qa:browser` = mobile-Lighthouse + responsive.
- `scripts/qa-lighthouse.mjs`: статический сервер на dist + mobile-Lighthouse по 5 шаблонам. accessibility/seo/best-practices ≥90 — ХАРД; performance — WARN (лаб-скор зависит от машины). lighthouse+chrome-launcher в devDeps (системный Chrome, без скачивания Chromium). На Windows teardown chrome.kill() глушит EPERM (гонка temp-профиля).
- `scripts/qa-responsive.mjs` (`npm run qa:responsive`): **Playwright на системном Chrome** (`chromium.launch({channel:'chrome'})` — без скачивания Chromium; playwright-core в devDeps) меряет scrollWidth≤clientWidth на 8 шаблонах × 5 ширин (320–1280) и называет элемент-виновник. Нашёл реальные переливы (закрытый попап погоды в RatesBar, вертик. фото без min(),420px, длинное слово в H1, длинный URL) — все починены. См. [[visual-check-and-space-tokens]].
- Опц. остаток: axe/pa11y отдельно (a11y Lighthouse уже на axe-core).

**Грабля `astro:assets` getImage:** при `widths:[…]` поле `.src` (фолбэк для `<img src=>`) = ОРИГИНАЛ источника (у hero — 2400px, >200КБ), даже если srcset капнут. Чинится `width: 1600` в getImage (HomePage hero). См. [[home-hero-rotation]]. Создавать контент — через `npm run new` (скаффолдер) + skill `add-content`.
