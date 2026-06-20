/*
 * Клиентский поиск по контенту — фильтр по уже загруженному JSON, без бэкенда
 * (§8.4). Нативный vanilla ES-модуль в public/js → внешний файл со 'self'
 * (script-src 'self', §18). Пустые состояния честные (CLAUDE правило 4) —
 * никаких подделанных результатов.
 */
const root = document.querySelector('[data-search]');
const input = root && root.querySelector('[data-search-input]');
const resultsEl = root && root.querySelector('[data-search-results]');
const emptyEl = root && root.querySelector('[data-search-empty]');
const dataEl = root && root.querySelector('[data-search-data]');

if (input && resultsEl && emptyEl && dataEl) {
  let items = [];
  try {
    items = JSON.parse(dataEl.textContent || '[]');
  } catch {
    items = [];
  }
  const hasContent = items.length > 0;
  const noContentMsg = emptyEl.getAttribute('data-empty-nocontent') || '';
  const noMatchMsg = emptyEl.getAttribute('data-empty-nomatch') || '';

  const norm = (s) => s.toLowerCase().trim();

  const render = (q) => {
    const query = norm(q);
    resultsEl.replaceChildren();
    if (!query) {
      resultsEl.hidden = true;
      emptyEl.hidden = true;
      return;
    }
    if (!hasContent) {
      resultsEl.hidden = true;
      emptyEl.textContent = noContentMsg;
      emptyEl.hidden = false;
      return;
    }
    const matches = items.filter(
      (it) => norm(it.title).includes(query) || norm(it.section).includes(query),
    );
    if (matches.length === 0) {
      resultsEl.hidden = true;
      emptyEl.textContent = noMatchMsg;
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    for (const it of matches.slice(0, 8)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = it.url;
      a.textContent = it.title;
      li.appendChild(a);
      resultsEl.appendChild(li);
    }
    resultsEl.hidden = false;
  };

  input.addEventListener('input', () => render(input.value));

  // Закрытие выпадашки результатов по клику вне поиска и по Escape.
  document.addEventListener('pointerdown', (e) => {
    if (!root.contains(e.target)) {
      resultsEl.hidden = true;
      emptyEl.hidden = true;
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resultsEl.hidden = true;
      emptyEl.hidden = true;
    }
  });
}
