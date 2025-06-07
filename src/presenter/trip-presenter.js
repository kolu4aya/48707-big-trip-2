import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import { render } from '../render';
import ListFilterView from '../view/list-filter-view';
import FilterButtonView from '../view/filter-button-view';
import ListSortView from '../view/list-sort-view';
import EventView from '../view/event-view';
import ListEventView from '../view/list-event-view';

export default class TripPresenter {
  listFilterComponent = new ListFilterView();
  listSortComponent = new ListSortView();
  listEventComponent = new ListEventView();

  constructor({ filterContainer, listEventsContainer }) {
    this.filterContainer = filterContainer;
    this.listEventsContainer = listEventsContainer;
 
  }

  init() {
    render(this.listFilterComponent, this.filterContainer);

    for (let i = 0; i < 4; i++) {
      render(new FilterView(), this.listFilterComponent.getElement());
    }
    render(new FilterButtonView(), this.listFilterComponent.getElement());
    render(this.listSortComponent, this.listEventsContainer);
    for (let i = 0; i < 4; i++) {
      render(new SortView(), this.listSortComponent.getElement());
    }

    render(this.listEventComponent, this.listEventsContainer);

    for (let i = 0; i < 4; i++) {
      render(new EventView(), this.listEventComponent.getElement());
    }
  }
}
