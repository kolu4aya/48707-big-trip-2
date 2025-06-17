import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import { render } from "../render";
import ListFilterView from "../view/list-filter-view";
import FilterButtonView from "../view/filter-button-view";
import ListSortView from "../view/list-sort-view";
import EventView from "../view/event-view";
import ListEventView from "../view/list-event-view";
import EditEventView from "../view/edit-point-view";

export default class TripPresenter {
  listFilterComponent = new ListFilterView();
  listSortComponent = new ListSortView();
  listEventComponent = new ListEventView();

  constructor({ filterContainer, listEventsContainer, pointsModel }) {
    this.filterContainer = filterContainer;
    this.listEventsContainer = listEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
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

render(
        new EditEventView({ point: this.tripPoints[0] }),
        this.listEventComponent.getElement()
      );
    for (let i = 0; i < this.tripPoints.length; i++) {
      render(
        new EventView({ point: this.tripPoints[i] }),
        this.listEventComponent.getElement()
      );
    }
  }
}
