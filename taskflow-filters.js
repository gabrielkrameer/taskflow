(() => {
  const list = document.getElementById('task-list');
  const select = document.getElementById('task-filter');

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
    for (const row of list.querySelectorAll(':scope > li')) {
      row.style.display = matchesFilter(row) ? '' : 'none';
    }
  }

  select.addEventListener('change', applyFilter);
  list.addEventListener('change', applyFilter);
  new MutationObserver(applyFilter).observe(list, { childList: true });
  applyFilter();
})();
