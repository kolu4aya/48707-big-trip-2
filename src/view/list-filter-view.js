import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {
  const { type, count } = filter;

  return `<div class='trip-filters__filter'>
            <input id='filter-${type}' class='trip-filters__filter-input  visually-hidden' type='radio' name='trip-filter' value='${type}' checked=${isChecked}>
            <label class='trip-filters__filter-label' for='filter-${type}'>${type} ${count}</label>
        </div>`;
}

function createListFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return `<form class='trip-filters' action='#' method='get'>
            ${filterItemsTemplate}
          </form>`;
}

export default class ListFilterView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filters);
  }
}
