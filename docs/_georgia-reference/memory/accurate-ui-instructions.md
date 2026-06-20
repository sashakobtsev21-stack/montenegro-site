---
name: accurate-ui-instructions
description: Dashboard/UI step instructions must match the real current UI — never invent menu paths
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b486a500-10e2-4175-8a98-4579ea4298c3
---

Владелец злится, когда пошаговые инструкции по интерфейсу (Cloudflare-дашборд, Google Search Console и т.п.) не совпадают с тем, что он реально видит на экране.

**Why:** неверные пути по меню тратят его время и убивают доверие — он кликает по реальным экранам, а не по докам из памяти.

**How to apply:** для любого UI-walkthrough давать ТОЧНЫЙ актуальный путь. Не уверен в текущем интерфейсе — честно сказать или спросить «что видишь на экране?» и подстроиться под его скриншот, а не угадывать правдоподобное меню. Конкретный промах, которого избегать: сказал «Settings → Domains & Routes» для кастом-домена воркера Cloudflare, тогда как **Domains** — это вкладка верхнего ряда (Overview · Metrics · Deployments · Bindings · Observability · Domains · Settings). Инструкции — короткие и выверенные. Связано с [[reviews-on-desktop]].
