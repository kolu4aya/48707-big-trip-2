import { render, remove } from '../framework/render.js';
import ListSortView from '../view/list-sort-view';
import ListEventView from '../view/list-event-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import { SortType, UpdateType, UserAction, FilterType } from '../const';
import { sortPointPrice, sortPointDay, sortPointTime } from '../utils/point';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const POINT_COUNT_PER_STEP = 8;

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #listEventsContainer = null;
  #listEventComponent = new ListEventView();
  #loadingComponent = new LoadingView();
  #loadMoreButtonComponent = null;
  #noPointComponent = null;
  #listSortComponent = null;

  #pointsModel = null;
  #filterModel = null;
  #offerModel = null;
  #destinationModel = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.DAY;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });
  #offers = [];
  #destinations = [];

  #renderedPointCount = POINT_COUNT_PER_STEP;

  #onNewPointDestroy = null;

  constructor({
    listEventsContainer,
    pointsModel,
    filterModel,
    offerModel,
    destinationModel,
    onNewPointDestroy,
  }) {
    this.#listEventsContainer = listEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    this.#offers = this.#offerModel.offers;
    this.#destinations = this.#destinationModel.destinations;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointDay);
    }

    return filteredPoints;
  }

  init() {
    this.#renderTrip();
  }

  createPoint() {
    this.#newPointPresenter = new NewPointPresenter({
      listEventsContainer: this.#listEventsContainer,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointDestroy,
      offers: this.#offerModel.offers,
      destinations: this.#destinationModel.destinations,
    });
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          this.#pointsModel.updatePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          this.#pointsModel.addPoint(updateType, update);
        } catch (error) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        try {
          this.#pointsModel.deletePoint(updateType, update);
        } catch (error) {
          this.#pointPresenters.get(update.id).setAborting();
        }

        break;
    }
    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
      offers: this.#offers,
      destinations: this.#destinations,
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

  #renderLoading() {
    render(this.#loadingComponent, this.#listEventsContainer);
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

    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#listSortComponent);
    remove(this.#loadingComponent);
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
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
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
