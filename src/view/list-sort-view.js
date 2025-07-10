import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItemTemplate(name, type) {
  return `<div class='trip-sort__item  trip-sort__item--${type}'>
              <input id='sort-${type}' class='trip-sort__input  visually-hidden' type='radio' name='trip-sort' value='sort-${type}' data-sort-type=${type}>
              <label class='trip-sort__btn' for='sort-${type}'>${name}</label>
            </div>`;
}

function createListSortTemplate(sortItems) {
  const sortItemsTemplate = Object.entries(sortItems)
    .map((item) => createSortItemTemplate(...item))
    .join('');
  return `<form class='trip-events__trip-sort  trip-sort' action='#' method='get'>
            ${sortItemsTemplate}
          </form>`;
}

export default class ListSortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#onSortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(SortType);
  }

  #onSortTypeChangeHandler = (evt) => {
    if (evt.target.tagName != 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
