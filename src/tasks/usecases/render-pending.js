import appStore from '../../store/task';

let element;

export const renderPending = (elementId) => {
  if (!element) element = document.querySelector(elementId);
  if (!element) throw new Error('Element id not found.');

  element.innerHTML = appStore.getTasks(appStore.filters.Pending).length;
}

