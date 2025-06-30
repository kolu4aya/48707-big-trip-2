import { render, replace, remove } from '../framework/render.js';
import ListSortView from '../view/list-sort-view';
import EventView from '../view/event-view';
import ListEventView from '../view/list-event-view';
import EditEventView from '../view/edit-point-view';
import LoadMoreButtonView from '../view/load-more-button-view';
import ListEmptyView from '../view/list-empty.js';

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {
  #listEventsContainer = null;
  #pointsModel = null;

  #listSortComponent = new ListSortView();
  #listEventComponent = new ListEventView();
  #loadMoreButtonComponent = null;

  #tripPoints = [];
  #renderedPointCount = POINT_COUNT_PER_STEP;

  constructor({ listEventsContainer, pointsModel }) {
    this.#listEventsContainer = listEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    this.#renderTrip();
  }

  #handleLoadMoreButtonClick = () => {
    this.#tripPoints
      .slice(
        this.#renderedPointCount,
        this.#renderedPointCount + POINT_COUNT_PER_STEP
      )
      .forEach((task) => this.#renderPoint(task));
    this.#renderedPointCount += POINT_COUNT_PER_STEP;
    if (this.#renderedPointCount >= this.#tripPoints.length) {
      remove(this.#loadMoreButtonComponent);
    }
  };

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new EventView({
      point,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });
    const pointEditComponent = new EditEventView({
      point,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listEventComponent.element);
  }

  #renderTrip() {
    render(this.#listSortComponent, this.#listEventsContainer);
    for (let i = 0; i < 4; i++) {
      render(new ListSortView(), this.#listSortComponent.element);
    }

    render(this.#listEventComponent, this.#listEventsContainer);

    if (!this.#tripPoints.length) {
      render(new ListEmptyView(), this.#listEventComponent.element);
    }

    const min = Math.min(this.#tripPoints.length, POINT_COUNT_PER_STEP);
    for (let i = 0; i < min; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }

    if (this.#tripPoints.length > POINT_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new LoadMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick,
      });
      render(this.#loadMoreButtonComponent, this.#listEventsContainer);
    }
  }
}
