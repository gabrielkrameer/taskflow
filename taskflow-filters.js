(() => {
  const list = document.getElementById('task-list');
  const select = document.getElementById('task-filter');
  const results = document.getElementById('filter-results');

  function matchesFilter(row) {
    const mode = select.value;
    const completed = Boolean(row.querySelector('input[type="checkbox"]')?.checked);
    const priority = row.querySelector('[aria-label^="Prioridade"]')?.textContent?.trim().toLowerCase() ?? '';
    if (mode === 'pendentes') return !completed;
    if (mode === 'concluidas') return completed;
    if (mode === 'alta') return priority === 'alta';
    if (mode === 'media') return priority === 'média';
    if (mode === 'baixa') return priority === 'baixa';
    return true;
  }

  function applyFilter() {
    const rows = [...list.querySelectorAll(':scope > li')];
    let total = 0;
    for (const row of rows) {
      const visible = matchesFilter(row);
      row.style.display = visible ? '' : 'none';
      if (visible) total += 1;
    }
    results.textContent = `${total} ${total === 1 ? 'tarefa exibida' : 'tarefas exibidas'}.`;
  }

  select.addEventListener('change', applyFilter);
  list.addEventListener('change', applyFilter);
  new MutationObserver(applyFilter).observe(list, { childList: true });
  applyFilter();
})();
