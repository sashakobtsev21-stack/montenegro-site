---
name: site-structure-changes-2026-06
description: "Структурные изменения сайта (2026-06): FAQ убран отовсюду, поле visit (цена/часы), флаг в хедере, featuredOrder, инлайн-фото"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1ba682c6-6d6c-4975-a59b-169461259e7e
---

Изменения структуры/шаблонов, внесённые в июне 2026 (знать при дальнейшей работе):

- **FAQ убран из ВСЕХ разделов** (решение владельца): сняты FAQBlock-рендеры из ArticlePage, HubPage, InsuranceHub, RoutePage и инлайн-FAQ из EdaDirectory; **FAQPage-schema больше не генерируется**. Поля `faq` во frontmatter/i18n оставлены дормантными (не рендерятся) — информация и так в теле статей. НЕ возвращать FAQ без явного решения владельца.
- **Поле `visit` + компонент VisitInfo** (articleBase): «Вход и часы работы» (`price`/`hours`/`note`/`checkedAt`), рендерится перед AccessFrom. Цены/часы — только из надёжного источника + дата проверки + «уточняйте»; не выдумывать. Заполнено для платных мест (Прометей/Сатаплиа/Вардзия/Уплисцихе).
- **Флаг Грузии в хедере** — SVG-ассет `/images/ge-flag.svg` (не хардкодить hex в компонентах; флаг вынесен в ассет).
- **`featuredOrder`** (articleBase, number) — ручной порядок в HubPage (`/goroda/`: tbilisi→batumi→kutaisi→остальные).
- **Инлайн-фото в статьях** — см. [[city-inline-photo-format]]; `reveal.js` чинён (раскрывает видимое при загрузке).
- **Полный роадмап** (P0✅ P1✅ → P2 разделы → P3 мультиязычность ka/en) — в `PROGRESS.md`.

Связано: [[entertainment-section-plan]], [[city-inline-photo-format]], [[article-content-standards]].
