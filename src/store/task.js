import { Task } from '../tasks/models/Task';

const initState = () => {
  loadStore();
  console.log('Start sate.');
}

const filters = {
  All: 'all',
  Completer: 'completed',
  Pending: 'pending'
};

const state = {
  tasks: [
    new Task('My first task'),
    new Task(' My second task')
  ], 
  filter: filters.All
}

const loadStore = () => {
  if (!localStorage.getItem('state')) return;

  const { tasks = [], filter = filters.All } = JSON.parse(localStorage.getItem('state'));
  state.tasks = tasks;
  state.filter = filter;
}

const saveStateLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}

const addTask = (title) => {
  if (!title) throw new Error('Title is required.');
  state.tasks.push(new Task(title));
  saveStateLocalStorage();
}

const changeTaskStatus = (taskId) => {
  state.tasks === state.tasks.map(task => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }

    return task;
  });

  saveStateLocalStorage();
}

const deleteTask = (taskId) => {
  state.tasks = state.tasks.filter(task => task.id !== taskId);
  saveStateLocalStorage();
}

const getTasks = (filter = filters.All) => {
  switch (filter) {
    case filters.All:
      return [...state.tasks]
    case filters.Completer:
      return state.tasks.filter(task => task.completed);
    case filters.Pending:
      return state.tasks.filter(task => !task.completed);
    default:
      throw new Error('Options not valid.');
  }
}

const setFilter = (filter = filters.All) => {
  state.filter = filter;
  saveStateLocalStorage();
}

const getCurrentFilter = () => {
  return state.filter;
}

export default {
  addTask,
  changeTaskStatus,
  deleteTask,
  filters,
  getCurrentFilter,
  getTasks,
  initState,
  setFilter,
};

