import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]:
    'Click «ADD NEW POINT in menu to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PRESENT]: 'There are no points present',
  [FilterType.PAST]: 'There are no past points now',
};

function createListEmptyTemplate() {
  const noPointTextValue = NoPointTextType[FilterType];
  return `<p class='trip-events__msg'>${noPointTextValue}</p>`;
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTaskTemplate(this.#filterType);
  }
}
