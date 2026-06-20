---
name: city-inline-photo-format
description: "Новый формат фото в статьях: инлайн-фигуры с подписями в теле + мини-галерея внизу; Тбилиси 20 фото; порядок городов через featuredOrder"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1ba682c6-6d6c-4975-a59b-169461259e7e
---

Владелец (2026-06-14) изменил формат фото в статьях. Раньше: галерея-сетка только внизу. Теперь — **гибрид**:

**Why:** фото должны быть интегрированы в чтение, а не свалены в конце; с подписями «что на фото».

**How to apply:**
- **Инлайн-фигуры**: ключевые фото — raw HTML прямо в теле .md:
  `<figure class="figure"><img src="/images/{slug}/gN.webp" alt="…" width="W" height="H" loading="lazy" decoding="async" /><figcaption>Описание что на фото. <span class="figure__credit">Фото: {author} / Wikimedia Commons, {license}</span></figcaption></figure>`
  width/height = реальные размеры webp (sharp) → 0 CLS. Вокруг блока — пустые строки; внутри блока пустых строк НЕТ (иначе Markdown рвёт).
- **Мини-галерея внизу**: остальные фото — во frontmatter `gallery` (рендерит `PhotoGallery` + лайтбокс). Каждое фото используется ОДИН раз: либо инлайн, либо в gallery.
- CSS инлайн-фигур — в `ArticlePage.astro`: `.prose :global(figure.figure)` (+ `.figure-row` для пары рядом). Лайтбокс на инлайн НЕ навешен (он только в нижней галерее) — это ок.
- **Кол-во фото**: Тбилиси — 20 (флагман, ~10 инлайн + ~10 в галерее). Остальные города — ~12–15 «по качеству»; у малых городов (Сигнахи 9, Гори 7, Зугдиди 6) CC-потолок ниже — это нормально (качество > квоты).
- **Паритет ru/uk**: одинаковые `src` инлайна и галереи; alt/подписи переведены; имена авторов латиницей в обеих версиях.
- **Порядок в `/goroda/`**: ручное поле `featuredOrder` (number) в `articleBase` — меньше = выше; HubPage сортирует по нему, затем publishedAt/slug. Сейчас: tbilisi 1 → batumi 2 → kutaisi 3 → остальные.

Связано: [[article-content-standards]], [[photo-pipeline-hybrid]], [[entertainment-section-plan]].
