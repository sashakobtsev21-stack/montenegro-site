---
name: establishment-instagram
description: При добавлении ЛЮБОГО заведения СПРАШИВАТЬ у владельца его Instagram — ссылка идёт в поле website (кнопка авто-«Instagram»)
metadata:
  type: feedback
---

**Правило владельца (2026-06-19):** при добавлении любого заведения — **спросить у владельца его Instagram** и поставить как ссылку места.

**How to apply:** перед созданием заведения спросить (1) Instagram и (2) нужен ли знак качества ([[quality-mark-establishments]]). Технически: **отдельные поля** `instagram` (IG) и `website` (личный сайт) — у ресторанов и статей-мест. **Личный сайт НЕ убирать** (решение владельца 2026-06-19) — показываем ОБЕ кнопки: «Сайт» (globe) + «Instagram» (icon instagram). Рендер в `RestaurantCard`, `ShowcaseRail` (поповер) и `ArticlePage`. У `website` есть авто-детект инстаграм-URL (на случай если IG попал в website).

**Why:** у заведений главный публичный контакт — Instagram; владелец сам присылает ссылки.

**Текущие IG (2026-06-19):** Guinness `guinness_by.sinori`, Teatro `teatro.club.batumi`, SushiMan `sushiman.ge.batumi`.
