---
name: post-merge-audit-followups
description: Отложенные пункты после пост-merge аудита IA — требуют решения владельца или сверки источника
metadata: 
  node_type: memory
  type: project
  originSessionId: c1767466-1e01-4dc8-bae3-15a379017b8f
---

После пост-merge аудита (2026-06-16) выполнены правки пунктов 1–11 (коммит `f0bab3c` на `main`). НЕ сделано намеренно — ждёт владельца:

**Факты на подтверждение (CLAUDE §4 — не выдумывать):**
- расхождение расстояния Тбилиси↔Кутаиси: где-то 230 км, в kutaisi.md «221 км» — свести к одному по источнику.
- автобус №37 vs №337 (транспорт) — уточнить номер.
- цифры в obyazatelnaya-strahovka-2026 (покрытие/штраф) — сверить с брифом/первоисточником.

**Решения владельца:**
- спонсор-карточки в `services` = ТОЛЬКО золотая рамка, без текст-бейджа «Партнёр» (решение 2026-06-16, зафиксировано в docstring ServicesDirectory + SPEC §16). НЕ возвращать бейдж и НЕ переподнимать a11y/disclosure-замечание без явного решения. RestaurantCard при этом бейдж «Партнёр» имеет — рассинхрон осознанный.
- `npm audit`: 9 уязвимостей, ВСЕ dev-tooling (esbuild/vite/astro), в статический `dist/` не попадают (прод-риск ноль). Безопасного фикса нет — только `npm audit fix --force` (breaking major-бамп Astro 6) = решение владельца, я не делаю.
- ✅ per-hub OG-картинки СДЕЛАНЫ (2026-06-16, `67a62e7`): каждый хаб отдаёт обложку первой карточки раздела как og:image/twitter:image (HubPage / AttractionsCatalog / EdaDirectory / EntertainmentHub) — без новых ассетов, вместо дизайнерских 1200×630. RelocationHub/InsuranceHub — узкие, при желании добавить так же. npm audit — подтверждено: dev-only @astrojs/check, в прод не идёт, не трогаем.
- ✅ удаление мёртвого FAQ-кода СДЕЛАНО (2026-06-17): удалён `FAQBlock.astro` (не импортировался) + схема `faqItem`/поле `faq` (content.config) + `faq`/`faqHeading` из i18n ru/uk/en и types.ts + `faq:`-фронтматтер из 70 .md (у en его не было). SPEC §8.1/§9/§14 синхронизированы. check/build/test/lint зелёные.

**Подсказки на будущее:** [[site-structure-changes-2026-06]] [[inbound-business-listings-ia]]. Директория услуг `/relokatsiya/uslugi/` пуста → под `noindex` + вне sitemap (фильтр в astro.config.mjs) ПОКА коллекция `services` пустая; добавишь реальные (не draft) услуги — убери две строки фильтра uslugi. Есть 3 draft-примера в `src/content/services/{ru,uk}/primer-*.md` (draft:true, не рендерятся) как шаблон.
