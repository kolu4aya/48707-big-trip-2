import AddNewPointView from '../view/add-new-point-view';
import AddNewPointWithoutDestinationView from '../view/add-new-point-without-destination-view';
import AddNewPointWithoutOffersView from '../view/add-new-point-without-offers-view';
import PointEditView from '../view/edit-point-view';
import FailedLoadDataView from '../view/failed-load-data-view';
import FilterView from '../view/filter-view';
import ListEmptyView from '../view/list-empty';
import LoadingView from '../view/loading-view';
import SortView from '../view/sort-view';
import TripEventsView from '../view/trip-events-view';
import {render} from '../render';
import ListFilterView from '../view/list-filter-view';
import FilterButtonView from '../view/filter-button-view';
import ListSortView from '../view/list-sort-view';
import EventView from '../view/event-view';
import ListEventView from '../view/list-event-view';

export default class TripPresenter {
  listFilterComponent = new ListFilterView();
  listSortComponent = new ListSortView();
  listEventComponent = new ListEventView();

  constructor({tripContainer,listEventsContainer, pageHeaderContainer}) {
    this.listEventsContainer = listEventsContainer;
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.listFilterComponent, this.tripContainer);
    
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
      // render(new PointView(), this.tripEventsComponent.getElement());
    }
  }
}