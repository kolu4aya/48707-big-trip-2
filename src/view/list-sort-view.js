import AbstractView from '../framework/view/abstract-view.js';

function createListSortTemplate() {
  return `<form class='trip-events__trip-sort  trip-sort' action='#' method='get'>
            <div class='trip-sort__item  trip-sort__item--day'>
              <input id='sort-day' class='trip-sort__input  visually-hidden' type='radio' name='trip-sort' value='sort-day'>
              <label class='trip-sort__btn' for='sort-day'>Day</label>
            </div>
          </form>`;
}

export default class ListSortView extends AbstractView {
  get template() {
    return createListSortTemplate();
  }
}
