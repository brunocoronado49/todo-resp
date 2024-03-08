import { createTaskHTML } from './create';

let element;

export const renderTasks = (elementId, tasks = []) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error('Element not found.');

  element.innerHTML = '';

  tasks.forEach((task) => {
    element.append(createTaskHTML(task));
  });
}

