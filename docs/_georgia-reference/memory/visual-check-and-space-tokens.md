---
name: visual-check-and-space-tokens
description: Грабли --space-токенов (нет --space-5/-7 → padding молча=0) + рабочий рецепт full-page скриншота dist для проверки вёрстки глазами
metadata:
  type: reference
---

**Грабля дизайн-токенов (§10, tokens.css):** шкала отступов НЕсплошная — есть `--space-1/2/3/4/6/8/12/16/24`, а `--space-5` и `--space-7` НЕ существуют. `padding: var(--space-5)` без fallback → свойство невалидно → отступ молча = 0 (так «съело» padding в AboutNote, фикс `4dff017`; раньше то же чинили в ServicesDirectory). Размеры текста: `--text-sm 14 / base 16 / lg 18 / xl 22 / 2xl 28`. Перед использованием токена-числа свериться со шкалой.

**Рецепт «посмотреть вёрстку глазами» (визуальная проверка dist):** обычный `chrome --headless --screenshot URL` здесь НЕ работает — (1) Git Bash конвертирует аргумент `/ru/...` в Windows-путь (ломает URL) → запускать с префиксом `MSYS_NO_PATHCONV=1`; (2) Chrome цепляется к запущенному профилю и снимает свою стартовую страницу. **Что сработало:** Node-скрипт, который поднимает крошечный статический сервер на `dist` (как в `scripts/qa-lighthouse.mjs`) и берёт **full-page screenshot из Lighthouse**: `rr.lhr.fullPageScreenshot.screenshot.data` (data-URL, декодировать base64 → файл). `formFactor:'desktop' + screenEmulation{mobile:false,width:1350,...}` для десктопа, по умолчанию mobile 412px. Затем `sharp(...).extract({left,top,width,height})` вырезать нужный блок и Read для просмотра. chrome-launcher.kill() на Windows глушить try/catch (EPERM temp). См. [[qa-gate]].
