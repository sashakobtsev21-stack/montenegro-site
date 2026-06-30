# AUDIT — ledger montenegro-site

> Сводный журнал аудитов: что закрыто, что открыто. Детальные прогоны — отдельными датированными файлами (`AUDIT-YYYY-MM-DD.md`). Обновляется при каждом аудите/закрытии находки.

## Прогоны
- **`AUDIT-2026-06-22.md`** — Этап 1, полный тех-аудит (метод: сначала верификация состояния репо, потом вывод). `qa`=GO (0 крит/0 сред; 76 минорных = ложные срабатывания декоративных alt). Сборка 70 страниц, `check` 0 ошибок. Lighthouse mobile a11y/BP/SEO=100, perf 89–97. Critical/High — нет.

## Закрыто (Этап 1, 2026-06-22)
- ✅ **[ГРУЗ-ХВОСТ]** В боевом коде/ассетах грузинских следов не осталось (grep): `/news`, агенты/скиллы, build-скрипты, favicon, hero/og, enums, i18n — локализованы под Черногорию. Осталась осознанная строка-провенанс «форк движка Georgia Guidebook» (SPEC/README) + архив `docs/_georgia-reference/` (не трогаем).
- ✅ **Безопасность (живой тест на проде):** `/go/` НЕ open-redirect — `trip-tours`→302 trip.com с `kwd=Montenegro`; неизвестный `evil-unknown`→302 на свой сайт (не наружу); `/go/` в sitemap = 0. CSP (`default-src 'self'`, без `unsafe-inline`), HSTS preload, XFO DENY, Referrer/Permissions-Policy, nosniff — все на проде.
- ✅ Тех-SEO: hreflang en↔ru + `x-default`, canonical, JSON-LD (Article/Breadcrumb/Organization/WebSite); `sitemap-index` живой (HTTP 200), `/go/` и demo исключены; `robots` Disallow `/go/`.
- ✅ Доступность: Lighthouse a11y=100 на всех страницах (76 «минорных» из dist-аудита = декоративный `alt=""` флага/hero — ложные).
- ✅ Гео решено: 3 макрорегиона (coastal/central/northern) + базовые города; uk удалён 2026-06-22 (→301 на корень).

## Закрыто (2026-06-30)
- ✅ **[фото]** Добор фото статей до нормы **≥5** — выполнен (старые cover + 3 инлайн дотянуты). Гейт `check-photos` соблюдён; ужесточение нормы до ≥5 закрыто.

## Открыто (см. `ROADMAP-FIX.md` с приоритетами)
- 🟡 **[Medium, perf]** Главная perf 89 (<90) — узкое место hero-LCP; остальные страницы 95–97. Опц. фикс: `preload` hero (+2–3). Лабораторный скор машинозависим.
- 🟡 **[Medium, монетизация]** EKTA (CIS-страховка) — временный прямой URL без атрибуции (клики не засчитываются); болванки EN-партнёрок (discovercars/getyourguide/booking) — прямой URL до регистрации. **Действие владельца.**
- ⚪ **[Low]** `npm audit`: prod 2 low (astro), dev 24 (tooling, не в прод-бандле); high/critical нет. Мониторить квартально.
