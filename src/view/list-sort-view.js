import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../const';

function createSortItemTemplate(name, type, currentSortType) {
  const checked = type === currentSortType ? 'checked' : '';
  const disabled = ['event', 'offers'].includes(type) ? 'disabled' : '';

  return `<div class='trip-sort__item  trip-sort__item--${type}'>
              <input id='sort-${type}' class='trip-sort__input  visually-hidden' type='radio' name='trip-sort' value='sort-${type}' data-sort-type=${type} ${checked} ${disabled}>
              <label class='trip-sort__btn' for='sort-${type}'>${name}</label>
            </div>`;
}

function createListSortTemplate(sortItems, currentSortType) {
  const sortItemsTemplate = Object.entries(sortItems)
    .map((item) => createSortItemTemplate(...item, currentSortType))
    .join('');
  return `<form class='trip-events__trip-sort  trip-sort' action='#' method='get'>
            ${sortItemsTemplate}
          </form>`;
}

export default class ListSortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#onSortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(SortType, this.#currentSortType);
  }

  #onSortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
