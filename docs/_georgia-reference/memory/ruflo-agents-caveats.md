---
name: ruflo-agents-caveats
description: Операционные дефекты установленных ruflo/my_agents плагинов — что не работает «из коробки»
metadata: 
  node_type: memory
  type: reference
  originSessionId: 2cef89df-797d-464a-bab4-970d36852eba
---

Установленные плагины из маркетплейса `ruflo` (= GitHub `sashakobtsev21-stack/my_agents`): ruflo-core, ruflo-swarm, ruflo-testgen, ruflo-security-audit, ruflo-docs + ui-ux-pro-max. Реальные агенты: coder, researcher, reviewer, witness-curator (core); architect, coordinator (swarm); tester; security-auditor; docs-writer. Все доменно-нейтральны, sonnet (docs-writer haiku).

Проверенный статус рантайма (июнь 2026, активирован и протестирован живьём):
- **ruflo MCP-сервер СКОНФИГУРИРОВАН и активирован:** `claude mcp add ruflo -- npx -y ruflo@latest mcp start` (scope проекта, в `~/.claude.json`) + `npx -y ruflo@latest config init` (создал `claude-flow.config.json`). После `/reload-plugins` в сессии появились ~293 `mcp__ruflo__*` инструмента.
- **Работает, но НЕСТАБИЛЕН на Windows+npx.** Проверено: `system_status` → healthy v3.10.42 (swarm running), `memory_store` → success (384-dim embedding, sql.js+HNSW, ~10ms). НО: тяжёлый `memory_search smart=true` рвёт соединение (`-32000 Connection closed`); сервер рестартует и теряет in-memory HNSW (обычный search → 0 результатов, хотя запись прошла); затем MCP-сервер полностью отваливается (293 tools пропадают). Совпадает с их же roadmap #7 (Windows daemon persistence: npx-сервер умирает при выходе родителя).
- **Для надёжности (если реально нужен):** поднять `daemon start`, или поставить `ruflo` глобально и перерегистрировать MCP на бинарь (не npx), или применить detached-spawn фикс (#7). **Для georgia-travel НЕ нужно** — доменные агенты от claude-flow не зависят.
- **Осторожно:** запуск любого ruflo/claude-flow CLI создаёт в cwd `.swarm/` (memory.db), `ruvector.db`, `claude-flow.config.json` — все в `.gitignore` georgia-travel.
- **`coder` читал `docs/SPEC.md` + `docs/adr/*`** — исправлено апстрим: `plugins/ruflo-core/agents/coder.md` теперь ищет спеку в корне (ruflo-core `0.2.3`, коммит `e3871cc`, запушен в my_agents). Локально для georgia это и так закрыто оверрайдом.
- **SPEC §19** правлен под реальность (нет `/new-project`/`/analyze-project`; старт через swarm/доустановку ruflo-sparc) — коммит `372602b`.

Проектная команда в `.claude/agents/`: доменные — astro-platform-engineer, seo-engineer, content-editor + контент/SEO-конвейер R4/R6 (seo-strategist → seo-content-writer → fact-checker → uk-translator) + оверрайды coder/architect/reviewer/tester/security-auditor. Переименованы при создании контент-команды: content-writer-ru → seo-content-writer, i18n-uk-adapter → uk-translator (вариант A, без дублей). Привязка к фазам R1–R6 — SPEC §20.
