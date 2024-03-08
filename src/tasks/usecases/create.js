export const createTaskHTML = (tasks) => {
  if (!tasks) throw new Error('Tasks are empty');
  const { id, title, completed, date } = tasks;

  const html = `
  <div class="list-item">
    <div class="list-texts">
      <h3 class="list-task-title">${title}</h3>
      <p class="task-text">${date}</p>
    </div>
    <div class="list-info">
      <p class="${completed ? 'status-pending' : 'status-completed'}">${completed ? 'Pending' : 'Completed'}</p>
    </div>
    <div class="list-icon">
      <p class="btn-delete">Delete</p>
    </div>
  </div>
  `;

  const lielement = document.createElement('li');
  lielement.innerHTML = html;
  lielement.setAttribute('data-id', id);
  if (completed) lielement.classList.add('completed');

  return lielement;
}

