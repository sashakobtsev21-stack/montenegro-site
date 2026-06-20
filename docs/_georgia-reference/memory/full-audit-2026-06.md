---
name: full-audit-2026-06
description: Полный мультиагентный аудит сайта (2026-06-17) — переиспользуемый skill /full-audit + агент ui-ux-auditor; отчёт AUDIT.md, ключевые P0 и вопросы владельцу
metadata:
  type: project
---

**Полный аудит сайта проведён 2026-06-17** по запросу владельца («полное тестирование, SEO+UI/UX, все аспекты»). Результат — `AUDIT.md` (в репо), ~**73/100**, 103 находки, приоритеты P0–P3 + план + разрешённые конфликты + слепые зоны + 8 вопросов владельцу.

**Как переиспользовать (оркестратор готов):**
- Skill **`/full-audit`** (`.claude/skills/full-audit/SKILL.md`) — описывает прогон. Запуск — через **Workflow** (ultracode): фаза «Аудит» (11 измерений параллельно спец-агентами) → «Обсуждение» (адверсариальная верификация critical/high + кросс-анализ конфликтов/дублей/слепых зон) → «Синтез» (сводный отчёт).
- Новый агент **`ui-ux-auditor`** (opus, Read/Grep/Glob/Bash) — UX/юзабилити + смотрит скриншоты Read'ом.
- Подготовка (фаза 0, ОДИН раз, иначе гонка за dist): `npm run qa` + `npm run qa:browser` + скриншоты (Playwright, как `qa-responsive.mjs`) → всё в `_scratch/audit/` (gitignored, вне public). Агентам: НЕ запускать `npm run qa`/`build` (сотрут dist).
- Прогон: 32 агента, ~2.1M токенов, ~31 мин.

**Главные P0 (сверить вживую перед фиксом — код в аудите НЕ менялся):**
1. **Perf картинок** — обложки в ArticlePage рендерятся raw `<img>` без `srcset` → Lighthouse mobile 78–87 (§15). Корень perf-долга — изображения, не JS. + 77МБ `public/images/_scratch/` уезжают в деплой (public копируется в dist несмотря на .gitignore).
2. **demo+noindex в sitemap** (45 вхождений) — фильтр `entry.data.demo` в `astro.config.mjs`; `noindex` ставить с `nofollow`.
3. **Денежный кластер «Страховки»** — ✅ ЗАКРЫТ (`b1c63c4`): добавлен евергрин-гайд `kak-vybrat-strahovku` (ru/uk/en, ориентиры, CC-фото, SafetyWing) + мост хаб→статья (`ins.guideLink`). **EKTA НЕ регистрируем** — партнёра нет и не будет (решение владельца 2026-06-17); в uk упомянут только информационно.

**Сквозные темы:** рассинхрон доков/комментов после миграции en→корень ([[english-3rd-language]]); полупустые/демо-разделы = контентный долг; гейты мягче правил (CI гонит не все check; CWV только WARN — см. [[qa-gate]]).

**Статус фиксов (2026-06-17, коммиты `bfc31fd`+`18f5746`):** закрыты дешёвые/безопасные P0–P3 — demo вне sitemap+`noindex,nofollow`, CI=полный `npm test`, a11y-контраст/фокус (токены `--border-cta`/`--color-gold-text`, AffiliateBox/kicker/SearchBox/hero-кредит), description по границе слова (`src/lib/text.ts`), worker https+allowSubId+HSTS, SPEC-синхрон (x-default→en). **Ложные находки (сверены):** P1-1 `_scratch` в деплое (gitignored), P0-2 вес обложек (гейт ≤200КБ). **Волна D ✅ (`896f2a3`,`e039403`):** P0-2 srcset обложек (`scripts/build-cover-variants.mjs`+`npm run build:covers`+манифест `src/data/cover-variants.json`, 92→182 варианта, srcset в ArticlePage/ArticleCard/RestaurantCard; Lighthouse mobile +2–5, лаб шумит), P2-1 reveal-страховка 2с + обложка вне data-reveal, аналитика=GA4 (решение владельца; CF отключить в дашборде → убрать из CSP). Хард-фейл CWV НЕ включён (composite-perf машинозависим). **Волна E ✅** (`b1c63c4`): кластер «Страховки» — гайд `kak-vybrat-strahovku` (без EKTA). **Волна F ✅** (`f8a4f5d`): JSDoc-6 (инверсия en→корень), ARIA-дедуп (VisitInfo/AffiliateBox→labelledby, хардкод breadcrumb локализован), Боржоми-дедуп. **Волна G ✅** (`910b29d`): кастомная **404** (`src/pages/404.astro`) + новый флаг BaseLayout **`utility`** (служебные страницы 404/offline — без canonical/hreflang/языкового свитчера, noindex; `navLangs=[lang]`). Грабля: 404 = `/404.html`, а canonical/hreflang дали бы `/404/` → битьё ссылок/линк-чек NO-GO → `utility` их убирает. **Отложено (по желанию):** sitemap lastmod (низкий ROI), уник. тела ресторанных карточек (L-контент), {год} в title. Полный статус — §8 в `AUDIT.md`.

**Вопросы владельцу (блокируют часть фиксов, §7 отчёта):** (1) x-default hreflang en или ru? (код=en, SPEC §12=ru); (2) аналитика GA4 или Cloudflare (§17 говорит CF, в коде GA4); (3) год в title — авто или ручной ритуал; (4) унифицировать маркёры платного (бейдж «Партнёр» vs золотая рамка); (5) ширина колонки чтения на десктопе; (6) политика фото у новостей в DoD; (7) мёртвая коллекция `cities` — развивать или удалить; (8) 2-й eSIM Saily как резерв.
