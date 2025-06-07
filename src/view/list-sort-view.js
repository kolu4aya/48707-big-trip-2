import {createElement} from '../render.js';

function createListSortTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            
          </form>`;
}

export default class ListSortView {
  getTemplate() {
    return createListSortTemplate();
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
