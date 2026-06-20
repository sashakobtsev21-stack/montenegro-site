---
name: article-photos-unique
description: Каждая статья должна иметь СВОИ уникальные фото — НЕ переиспользовать кадры из других статей (правило владельца 2026-06-19)
metadata:
  type: feedback
---

**Правило владельца (2026-06-19):** для новой статьи **нельзя переиспользовать фото из других статей** — у каждой статьи свои уникальные кадры. (Раньше ставились существующие `/images/*` из городов/мест — владелец это отверг.)

**How to apply:** под новую статью искать НОВЫЕ фото через пайплайн (Unsplash — `unsplash-candidates.mjs`/`build-unsplash.mjs`, ключ в `.env`; Commons — `commons-candidates.mjs`/`build-gallery.mjs`) и класть в **свою папку** `public/images/<slug>/gN.webp` + обложку `public/images/<slug>.webp`. Кадры отбирать глазами (контактный лист), факт-проверять, что на фото (не выдавать чужую страну/валюту за грузинскую — был прокол: Unsplash «money» = купюра 50000, не лари). Атрибуция едет с фото: «Фото: Автор / Unsplash» или «… / Wikimedia Commons, CC …». Связано с [[article-content-standards]], [[photo-pipeline-hybrid]], [[content-photos-mandatory]].

**Why:** уникальные фото = не выглядит как переклейка, лучше для доверия и SEO; владелец следит за этим.
