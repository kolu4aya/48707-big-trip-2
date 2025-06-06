import {createElement} from '../render.js';

function createFilterButtonTemplate() {
  return `<button class="visually-hidden" type="submit">Accept filter</button>`;
}

export default class FilterButtonView {
  getTemplate() {
    return createFilterButtonTemplate();
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
