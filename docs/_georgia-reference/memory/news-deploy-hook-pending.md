---
name: news-deploy-hook-pending
description: "РЕАЛИЗОВАНО: ежедневный авто-rebuild новостей через GitHub Actions (пустой коммит — Cloudflare Workers Builds не поддерживает deploy hooks). План Б — wrangler+CF token."
metadata:
  type: project
---

Блок «Новости» реализован (коммит `724c1cc`, 2026-06-17): на главной под hero —
лента «Последние новости» (свежие за **2 дня**), в `/novosti/` — за **10 дней**.
Механика свежести для SSG: **серверный фильтр по дате СБОРКИ** (HomePage/NewsPage,
`Math.floor((Date.now()-publishedAt)/DAY) <= окно`) **+ клиентский**
`public/js/news-freshness.js` (внешний модуль, CSP §18) — держит окно МЕЖДУ
сборками по реальному «сейчас», прячет пустые помесячные группы, показывает
`data-news-empty`/скрывает блок (`data-news-section`). Атрибуты: `data-news-feed`
+ `data-news-window`, `data-news-item` + `data-published`, `data-news-group`.

**РЕАЛИЗОВАНО (2026-06-17):** `.github/workflows/daily-news-rebuild.yml` — cron
`0 5 * * *` (+ workflow_dispatch). **Cloudflare Workers Builds НЕ поддерживает
deploy hooks** (проверено по docs: триггер только git push). Поэтому workflow
делает **пустой коммит** в main (`git commit --allow-empty` + `git push`,
`permissions: contents: write` на GITHUB_TOKEN) → Cloudflare видит push и
пересобирает → старые новости (>10 дней) уходят из ленты и sitemap. Настройка
владельцу НЕ нужна. Минус — 1 пустой коммит/день в истории main.

**План Б (без пустых коммитов):** деплой из Actions через `wrangler deploy`
+ секрет `CLOUDFLARE_API_TOKEN` (Actions сам собирает и деплоит, вместо Cloudflare
Build). Чище историю, но дублирует деплой-путь и нужен CF API-токен.

(Опц., НЕ сделано) исключить /novosti/-статьи старше 10 дней из sitemap (astro.config
sitemap filter); сами страницы НЕ удалять/НЕ 404 (CLAUDE правило 3) — из ленты их и
так убирает rebuild + клиентский фильтр.
Связано: [[content-photos-mandatory]], [[update-docs-after-each-change]].
