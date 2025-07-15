import { render, remove } from '../framework/render.js';
import ListSortView from '../view/list-sort-view';
import ListEventView from '../view/list-event-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import PointPresenter from './point-presenter';
import { SortType, UpdateType, UserAction, FilterType } from '../const';
import { sortPointPrice, sortPointDay, sortPointTime } from '../utils/point';
import { filter } from '../utils/filter.js';

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {
  #listEventsContainer = null;
  #pointsModel = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #filterType = FilterType.DAY;

  #listEventComponent = new ListEventView();
  #loadMoreButtonComponent = null;
  #noPointComponent = null;
  #listSortComponent = null;

  #renderedPointCount = POINT_COUNT_PER_STEP;

  constructor({ listEventsContainer, pointsModel, filterModel }) {
    this.#listEventsContainer = listEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
    }

    return filteredTasks;
  }

  init() {
    this.#renderTrip();
  }

  #handleLoadMoreButtonClick = () => {
    const pointCount = this.points.length;
    const newRenderedPointCount = Math.min(
      pointCount,
      this.#renderedPointCount + POINT_COUNT_PER_STEP
    );
    const points = this.points.slice(
      this.#renderedPointCount,
      newRenderedPointCount
    );

    this.#renderPoints(points);
    this.#renderedPointCount = newRenderedPointCount;

    if (this.#renderedPointCount >= pointCount) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripEvents();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTripEvents({
          resetRenderedPointCount: true,
          resetSortType: true,
        });
        this.#renderTrip();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listEventsContainer: this.#listEventComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripEvents({ resetRenderedPointCount: true });
    this.#renderTrip();
  };

  #renderSort() {
    this.#listSortComponent = new ListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#listSortComponent, this.#listEventsContainer);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    this.#noPointComponent = new ListEventView({
      filterType: this.#filterType,
    });
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent = new LoadMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick,
    });
    render(this.#loadMoreButtonComponent, this.#listEventsContainer);
  }

  #clearTripEvents({
    resetRenderedPointCount = false,
    resetSortType = false,
  } = {}) {
    const pointCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#listSortComponent);
    remove(this.#loadMoreButtonComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetRenderedPointCount) {
      this.#renderedPointCount = POINT_COUNT_PER_STEP;
    } else {
      this.#renderedPointCount = Math.min(pointCount, this.#renderedPointCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderTrip() {
    this.#renderSort();
    render(this.#listEventComponent, this.#listEventsContainer);

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    render(this.#listEventComponent, this.#listEventsContainer);

    this.#renderPoints(
      points.slice(0, Math.min(pointCount, this.#renderedPointCount))
    );

    if (pointCount > this.#renderedPointCount) {
      this.#renderLoadMoreButton();
    }
  }
}
