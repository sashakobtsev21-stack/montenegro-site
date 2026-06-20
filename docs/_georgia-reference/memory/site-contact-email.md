---
name: site-contact-email
description: Контакт сайта — почта info@georgiaguidebook.com (предложения/реклама/коммерция); Telegram-канал @it_notess удалён
metadata: 
  node_type: memory
  type: project
  originSessionId: c1767466-1e01-4dc8-bae3-15a379017b8f
---

**info@georgiaguidebook.com** — официальная почта сайта и единственный контакт для обратной связи: предложения, реклама, коммерческие запросы, правки фактов. Форм на сайте нет (§18) — связь только через `mailto:`.

Telegram-канал **@it_notess** (`t.me/it_notess`) был зашит как контакт в подвале (`footer.creatorUrl`) и на «Контактах» (`contacts.channels.telegram*`) — владелец велел удалить. Убрано в коммите `0cfeeb8`:
- «Контакты» (ru+uk): `mailto:info@georgiaguidebook.com` + иконка `mail`; добавлен повод написать «реклама/сотрудничество/коммерческое предложение».
- Подвал: кредит «A. Kobtsev» теперь обычный текст без ссылки.
- i18n: `footer.creatorUrl` удалён; `contacts.channels` → `email`/`emailLabel`/`emailUrl`.

Не возвращать @it_notess как контакт без явного решения владельца.

**Прим.:** `SPEC.md` (§137, §411–412) ещё называет контакт «почта/Telegram» — для *контакта* это устарело (теперь только почта). При этом Telegram как канал *дистрибуции контента* (§403/§411, Pinterest/Telegram для роста) — отдельная история и может появиться позже. См. [[site-structure-changes-2026-06]].
