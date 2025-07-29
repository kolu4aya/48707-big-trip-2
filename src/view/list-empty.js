import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../const';

const NoPointsTextType = {
  [FilterType.EVERYTHING]:
    'Click New event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'there are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createListEmptyTemplate() {
  const noPointTextValue = NoPointsTextType[FilterType];
  return `<p class='trip-events__msg'>${noPointTextValue}</p>`;
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor({ filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
