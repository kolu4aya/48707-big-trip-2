import {render, replace, remove} from '../framework/render.js';
import ListFilterView from '../view/list-filter-view';
import FilterButtonView from '../view/filter-button-view';
import ListSortView from '../view/list-sort-view';
import EventView from '../view/event-view';
import ListEventView from '../view/list-event-view';
import EditEventView from '../view/edit-point-view';
import LoadMoreButtonView from '../view/load-more-button-view';

const POINT_COUNT_PER_STEP = 8;

export default class TripPresenter {

  #filterContainer = null;
  #listEventsContainer = null;
  #pointsModel = null;

  #listFilterComponent = new ListFilterView();
  #listSortComponent = new ListSortView();
  #listEventComponent = new ListEventView();
  #loadMoreButtonComponent = null;

  #tripPoints = [];
  #renderedPointCount = POINT_COUNT_PER_STEP;

  constructor({ filterContainer, listEventsContainer, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#listEventsContainer = listEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.getPoints()];
    render(this.#listFilterComponent, this.#filterContainer);

    for (let i = 0; i < 4; i++) {
      render(new ListFilterView(), this.#listFilterComponent.element);
    }
    render(new FilterButtonView(), this.#listFilterComponent.element);
    render(this.#listSortComponent, this.#listEventsContainer);
    for (let i = 0; i < 4; i++) {
      render(new ListSortView(), this.#listSortComponent.element);
    }

    render(this.#listEventComponent, this.#listEventsContainer);
    // render(
    //   new EditEventView({ point: this.#tripPoints[0] }),
    //   this.#listEventComponent.element
    // );
    for (let i = 0; i < Math.min(this.#tripPoints.length, POINT_COUNT_PER_STEP); i++) {

      this.#renderPoint(this.#tripPoints[i]);
       
    }

  if (this.#tripPoints.length > POINT_COUNT_PER_STEP) {
     this.#loadMoreButtonComponent = new LoadMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick
      });
  }
    render(this.#loadMoreButtonComponent, this.#listEventComponent.element);
      }
  #handleLoadMoreButtonClick = () => {
    this.#listEventComponent
      .slice(this.#renderedPointCount, this.    #renderedPointCount + POINT_COUNT_PER_STEP)
      .forEach((task) => this.#renderPoint(task));
    this.#renderedPointCount += POINT_COUNT_PER_STEP;
    if (this.#renderedPointCount >= this.#listEventComponent.length) {
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
      }
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
}
