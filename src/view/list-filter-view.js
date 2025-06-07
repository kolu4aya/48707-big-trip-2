import {createElement} from '../render.js';

function createListFilterTemplate() {
  return `<form class="trip-filters" action="#" method="get">
            
          </form>`;
}

export default class ListFilterView {
  getTemplate() {
    return createListFilterTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
