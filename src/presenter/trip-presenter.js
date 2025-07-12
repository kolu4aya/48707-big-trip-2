import { render, remove } from "../framework/render.js";
import ListSortView from "../view/list-sort-view";
import ListEventView from "../view/list-event-view";
import LoadMoreButtonView from "../view/load-more-button-view";
import ListEmptyView from "../view/list-empty.js";
import PointPresenter from "./point-presenter.js";
import { updateItem } from "../utils/common.js";
import { SortType } from "../const.js";
import { sortPointPrice, sortPointDay, sortPointTime } from "../utils/point.js";

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {
  #listEventsContainer = null;
  #pointsModel = null;
  #tripPoints = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourseTripPoints = [];

  #listEventComponent = new ListEventView();
  #loadMoreButtonComponent = null;
  #listEmptyComponent = new ListEmptyView();
  #listSortComponent = null;

  #renderedPointCount = POINT_COUNT_PER_STEP;

  constructor({ listEventsContainer, pointsModel }) {
    this.#listEventsContainer = listEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#tripPoints.sort(sortPointDay);

    this.#sourseTripPoints = [...this.#pointsModel.points];

    this.#renderTrip();
  }

  #handleLoadMoreButtonClick = () => {
    this.#renderPoints(
      this.#renderedPointCount,
      this.#renderedPointCount + POINT_COUNT_PER_STEP
    );

    this.#renderedPointCount += POINT_COUNT_PER_STEP;
    if (this.#renderedPointCount >= this.#tripPoints.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourseTripPoints = updateItem(this.#sourseTripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listEventsContainer: this.#listEventComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortPointTime);
        break;
      case SortType.DAY:
        this.#tripPoints.sort(sortPointDay);
        break;
      default:
        this.#tripPoints = [...this.#sourseTripPoints];
        break;
    }

    this.#currentSortType = SortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#listSortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#listSortComponent, this.#listEventsContainer);
  }

  #renderPoints(from, to) {
    this.#tripPoints.slice(from, to).forEach((task) => this.#renderPoint(task));
  }

  #renderNoPoints() {
    render(this.#listEmptyComponent, this.#listEventComponent.element);
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent = new LoadMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick,
    });
    render(this.#loadMoreButtonComponent, this.#listEventsContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#renderedPointCount = POINT_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #renderPointsList() {
    render(this.#listEventComponent, this.#listEventsContainer);
    this.#renderPoints(
      0,
      Math.min(this.#tripPoints.length, POINT_COUNT_PER_STEP)
    );

    if (this.#tripPoints.length > POINT_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderTrip() {
    this.#renderSort();
    render(this.#listEventComponent, this.#listEventsContainer);

    if (!this.#tripPoints.length) {
      this.#renderNoPoints();
    }
    this.#renderPointsList();
  }
}
