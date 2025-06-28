import AbstractView from '../framework/view/abstract-view.js';

function createListFilterTemplate() {
  return `<form class='trip-filters' action='#' method='get'>
            <div class='trip-filters__filter'>
            <input id='filter-present' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='present'>
            <label class='trip-filters__filter-label' for='filter-present'>Present</label>
        </div>
          </form>`;
}

export default class ListFilterView extends AbstractView {
  get template() {
    return createListFilterTemplate();
  }
}
