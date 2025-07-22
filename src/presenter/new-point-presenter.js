import { remove, render, RenderPosition } from '../framework/render.js';
import EditEventView from '../view/edit-point-view';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #listEventsContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  #offers = [];
  #destinations = [];

  constructor({
    listEventsContainer,
    onDataChange,
    onDestroy,
    offers,
    destinations,
  }) {
    this.#listEventsContainer = listEventsContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    (this.#offers = offers), (this.#destinations = destinations);
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditEventView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    render(
      this.#pointEditComponent,
      this.#listEventsContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, point);
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
