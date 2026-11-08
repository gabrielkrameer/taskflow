(() => {
  const dialog = document.getElementById('new-task-dialog');
  const openButton = document.getElementById('open-task-dialog');
  const cancelButton = document.getElementById('cancel-task');
  const form = document.getElementById('new-task-form');
  const list = document.getElementById('task-list');
  const status = document.getElementById('task-status');
  const demoButton = document.getElementById('demo-button');
  const openCount = document.getElementById('open-count');

  function announce(text) {
    status.textContent = text;
  }

  function makeTask(title, priority) {
    const row = document.createElement('li');
    row.className = 'flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4 sm:flex-nowrap';
    const label = document.createElement('label');
    label.className = 'flex min-w-0 flex-1 cursor-pointer items-center gap-3';
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'size-5 shrink-0 cursor-pointer rounded-md border-line accent-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';
    check.setAttribute('aria-label', `Marcar ${title} como concluída`);
    const info = document.createElement('span');
    info.className = 'flex min-w-0 flex-col gap-1';
    const heading = document.createElement('strong');
    heading.className = 'text-sm leading-5 font-bold';
    heading.textContent = title;
    const detail = document.createElement('span');
    detail.className = 'text-xs leading-5 text-muted';
    detail.textContent = 'Nova tarefa · Criada nesta sessão';
    info.append(heading, detail);
    label.append(check, info);
    const tag = document.createElement('span');
    tag.className = 'shrink-0 rounded-full px-3 py-1 text-xs font-bold';
    const appearances = {
      'Alta': ['bg-[#FEF3F2]', 'text-[#B42318]'],
      'Média': ['bg-[#FFFAEB]', 'text-[#B54708]'],
      'Baixa': ['bg-[#ECFDF3]', 'text-[#027A48]']
    };
    tag.classList.add(...appearances[priority]);
    tag.textContent = priority;
    tag.setAttribute('aria-label', `Prioridade ${priority.toLowerCase()}`);
    row.append(label, tag);
    return row;
  }

  openButton.addEventListener('click', () => dialog.showModal());
  cancelButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const title = document.getElementById('task-title').value.trim();
    const priority = document.getElementById('task-priority').value;
    if (title.length < 3) return;
    list.prepend(makeTask(title, priority));
    openCount.textContent = String(Number(openCount.textContent) + 1);
    dialog.close();
    form.reset();
    announce(`Tarefa ${title} adicionada com prioridade ${priority}.`);
    openButton.focus();
  });
  list.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || event.target.type !== 'checkbox') return;
    const taskHeading = event.target.closest('label')?.querySelector('strong');
    if (!taskHeading) return;
    taskHeading.classList.toggle('line-through', event.target.checked);
    taskHeading.classList.toggle('text-muted', event.target.checked);
    announce(`Tarefa ${taskHeading.textContent} ${event.target.checked ? 'concluída' : 'marcada como pendente'}.`);
  });
  demoButton.addEventListener('click', () => announce('Botão normal ativado. O botão desabilitado não pode ser acionado.'));
})();
