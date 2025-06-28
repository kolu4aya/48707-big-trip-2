import AbstractView from '../framework/view/abstract-view.js';

function createFilterButtonTemplate() {
  return '<button class="visually-hidden" type="submit">Accept filter</button>';
}

export default class FilterButtonView extends AbstractView {
  get template() {
    return createFilterButtonTemplate();
  }
}
