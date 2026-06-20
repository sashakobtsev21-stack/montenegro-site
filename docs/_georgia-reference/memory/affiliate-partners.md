---
name: affiliate-partners
description: Партнёрский стек /go/; EKTA ⏸️ временно снята (TP сломан с 05.06) → боксы на SafetyWing; ПРОВЕРИТЬ EKTA ~2026-07-02 и вернуть (выгоднее)
metadata:
  type: project
---

Партнёрская монетизация через `/go/{partner}?c={slug}` (Worker, карта `src/data/partners.json`; `rel="sponsored nofollow noopener"`, 1–3 AffiliateBox/статья). Источник правды — **SPEC §16**.

**Стек (на 2026-06-18):**
- Trip.com — `carhire`/`hotels`/`tours`/`transfers` (Allianceid 8701645). `trip-flights` оставлен, НЕ используется. SafetyWing (Ambassador 26545532).
- Travelpayouts (зарегистрирован, вывод из Грузии: Payoneer/PayPal/банк/USDT): **Localrent** (аренда) ✅ + **Aviasales** (авиабилеты) ✅ + **Airalo** (eSIM) ✅ — живые `*.tpx.gr`-ссылки с `?sub_id={subid}`, allowSubId:true. Проверены (→ localrent.com / aviasales.com / airalo.com). Airalo перенесён с Impact на Travelpayouts 2026-06-18; старый Impact-аккаунт (`pxf.io`) НЕ удалён — дохватывает старые cookie.

**🔔 ПРОВЕРИТЬ EKTA ~2026-07-02 (через 1–2 недели от 2026-06-18):** EKTA на стороне Travelpayouts СЛОМАНА с **05.06.2026** («marker is not subscribed to campaign» — техпроблемы у EKTA). EKTA-боксы **временно заменены на SafetyWing** на всех 3 страницах: `viza-v-gruziyu`, `obyazatelnaya-strahovka-2026`, `kak-vybrat-strahovku`. Ключ `ekta` в `partners.json` ОСТАВЛЕН (urlTemplate = прямой `ektatraveling.com`, не используется боксами). **Когда EKTA починят — вернуть боксы EKTA** (выгоднее: EKTA ~25% против ~10% у SafetyWing): на viza + obyazatelnaya заменить `safetywing`→`ekta`; на `kak-vybrat-strahovku` добавить EKTA вторым боксом («туристам») рядом с SafetyWing («номадам»); вставить КОРРЕКТНУЮ EKTA-ссылку tpx.gr (прошлая `yhftQyRL` вела на VisitorsCoverage p=4552!) с `?sub_id={subid}`, `allowSubId:true`.

**SubID:** Travelpayouts принимает `?sub_id=` у коротких ссылок; worker подставляет slug в `{subid}`.

**Размещение боксов (актуально):**
- Страховки → **SafetyWing**: `viza-v-gruziyu`, `obyazatelnaya-strahovka-2026`, `kak-vybrat-strahovku`. (EKTA на паузе — см. выше.)
- Localrent → спицы аренды Тбилиси/Батуми/Кутаиси (Trip.com carhire — опорная `kak-arendovat-avto`, `bez-depozita`, хаб `/arenda-avto/`).
- Aviasales → транспорт: хаб `/transport/`, `aeroporty-gruzii`, `tbilisi-batumi`.
- Trip.com: hotels → города/развлечения/`dolgosrochnaya-arenda`/хаб `/goroda/` + HotelWidget (Тбилиси/Батуми); tours → достопримечательности/города; transfers → транспорт.

**Не трогаем сейчас:** Trip.com `carhire`/`hotels`/`tours`/`transfers` — Booking на ревью. Туры/eSIM/жильё — кандидаты отобраны (аудит 2026-06-18), отложены до трафика: туры — Tripster/GetYourGuide; eSIM — Yesim/Saily/Airalo→TP; жильё — Booking/ZenHotels.

**Бэклог улучшений (при трафике, не раньше)** — `TODO-affiliates.md`: (1) вернуть EKTA вместо SafetyWing при починке (выгоднее + SafetyWing НЕ работает для РФ/UA — ядро аудитории); (2) GetYourGuide (45 trip-tours) + Booking (21 trip-hotels + хаб + 2 виджета) при трафике ~3 мес.

См. [[home-showcase-monetization]].
