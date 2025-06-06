import {createElement} from '../render.js';

function createTripEventsTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class TripEventsView {
  getTemplate() {
    return createTripEventsTemplate();
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