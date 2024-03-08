import html from './app.html?raw';
import appStore from '../store/task';
import { renderPending} from './usecases/render-pending';
import { renderTasks } from './usecases/render-tasks';

const elementsId = {
  newTodoInput: '#new-todo',
  buttonNewInput: '#btn-add',
  rendingCount: '#pending-count',
  todoList: '.todo-list',
  todoFilter: '.filtro',
};

export const App = (elementId) => {
  const displayTasks = () => {
    const tasks = appStore.getTasks(appStore.getCurrentFilter());
    renderTasks(elementsId.todoList, tasks);
    updatePendingCount();
  }

  const updatePendingCount = () => {
    renderPending(elementsId.rendingCount);
  }

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTasks();
  })();

  const newTaskInput = document.querySelector(elementsId.newTodoInput);
  const taskListUl = document.querySelector(elementsId.todoList);
  const filterUl = document.querySelectorAll(elementsId.todoFilter);

  newTaskInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    appStore.addTask(event.target.value);
    displayTasks();
    event.target.value = '';
  });

  taskListUl.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    appStore.changeTaskStatus(element.getAttribute('data-id'));
    displayTasks();
  });

  taskListUl.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    const isDeleted = event.target.className === 'btn-delete';
    if (!element || !isDeleted) return;

    appStore.deleteTask(element.getAttribute('data-id'));
    displayTasks();
  });

  filterUl.forEach(element => {
    element.addEventListener('click', newElement => {
      switch (newElement.target.text) {
        case 'All':
          appStore.setFilter(appStore.filters.All);
          break;
        case 'Pending':
          appStore.setFilter(appStore.filters.Pending);
          break;
        case 'Completed':
          appStore.setFilter(appStore.filters.Completer);
          break;
      }
      displayTasks();
    });
  });
}

