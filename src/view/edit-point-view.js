import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { TYPE_OF_ROUTE } from '../const';
import { getDestination } from '../mock/destination';
import { getOffers } from '../mock/offers';
import { humanizePointDate } from '../utils/point';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: TYPE_OF_ROUTE[5],
  destination: '',
  offers: '',
  timeStart: '',
  timeEnd: '',
  favorite: false,
  cost: 0,
};

const createEditPointTemplate = (data) => {
  const { type, destination, offers, timeStart, timeEnd, cost } = data;

  const createTypes = (items = TYPE_OF_ROUTE) =>
    items
      .map((item) => {
        const typeLow = item.toLowerCase();
        const checked = item === type ? ' checked' : '';
        return `<div class='event__type-item'>
              <input id='event-type-${typeLow}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${item}' ${checked}>
              <label class='event__type-label  event__type-label--${typeLow}' for='event-type-${typeLow}-1'>${item}</label>
            </div>`;
      })
      .join('');

  const createDestinations = (items = []) =>
    items.map((item) => `<option value='${item.name}'></option>`).join('');

  const createOffers = (items = [], typeForOffer) => {
    items = items.filter((item) => item.type === typeForOffer);

    return items
      .map((item) => {
        const itemAtr = item.title.split(item.title.split(' ').length - 1);
        const checked = offers.includes(item) ? ' checked' : '';
        return `<div class='event__offer-selector'>
                <input class='event__offer-checkbox  visually-hidden' id='event-offer-${itemAtr}-1' type='checkbox' name='event-offer-${itemAtr}' ${checked}>
                <label class='event__offer-label' for='event-offer-${itemAtr}-1'>
                  <span class='event__offer-title'>${item.title}</span>
                  &plus;&euro;&nbsp;
                  <span class='event__offer-price'>${item.price}</span>
                </label>
              </div>`;
      })
      .join('');
  };

  const createImages = (destinationForPhoto) => {
    let str = '';
    if (
      destinationForPhoto.pictures !== undefined &&
      destinationForPhoto.pictures?.length > 0
    ) {
      const { pictures = [] } = destinationForPhoto;
      str =
        '<div class="event__photos-container"><div class="event__photos-tape">';
      str += pictures.map(
        (item) =>
          `<img class='event__photo' src='img/photos/${item.src}' alt='${item.alt}'>`
      );
      str += '</div></div>';
    }

    return str;
  };

  const dateStart = humanizePointDate(timeStart, 'DD/MM/YY HH:mm');
  const dateEnd = humanizePointDate(timeEnd, 'DD/MM/YY HH:mm');

  return `<form class='event event--edit' action='#' method='post'>
                <header class='event__header'>
                  <div class='event__type-wrapper'>
                    <label class='event__type  event__type-btn' for='event-type-toggle-1'>
                      <span class='visually-hidden'>Choose event type</span>
                      <img class='event__type-icon' width='17' height='17' src='img/icons/${type.toLowerCase()}.png' alt='Event type icon'>
                    </label>
                    <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>

                    <div class='event__type-list'>
                      <fieldset class='event__type-group'>
                        <legend class='visually-hidden'>Event type</legend>
                        ${createTypes()}
                      </fieldset>
                    </div>
                  </div>

                  <div class='event__field-group  event__field-group--destination'>
                    <label class='event__label  event__type-output' for='event-destination-1'>
                      ${type}
                    </label>
                    <input class='event__input  event__input--destination' id='event-destination-1' autocomplete='off' type='text' name='event-destination' required value='${
                      destination !== undefined ? destination.name : ''
                    }' list='destination-list-1'>
                    <datalist id='destination-list-1'>
                      ${createDestinations(getDestination())}
                    </datalist>
                  </div>

                  <div class='event__field-group  event__field-group--time'>
                    <label class='visually-hidden' for='event-start-time-1'>From</label>
                    <input class='event__input  event__input--time' data-provider='flatpickr' id='event-start-time-1' type='text' name='event-start-time' value='${dateStart}'>
                    &mdash;
                    <label class='visually-hidden' for='event-end-time-1'>To</label>
                    <input class='event__input  event__input--time' data-provider='flatpickr' id='event-end-time-1' type='text' name='event-end-time' value='${dateEnd}'>
                  </div>

                  <div class='event__field-group  event__field-group--price'>
                    <label class='event__label' for='event-price-1'>
                      <span class='visually-hidden'>Price</span>
                      &euro;
                    </label>
                    <input class='event__input  event__input--price' id='event-price-1' type='text' name='event-price' value='${cost}'>
                  </div>

                  <button class='event__save-btn  btn  btn--blue' type='submit'>Save</button>
                  <button class='event__reset-btn' type='reset'>Delete</button>
                  <button class='event__rollup-btn' type='button'>
                    <span class='visually-hidden'>Open event</span>
                  </button>
                </header>
                <section class='event__details'>
                  <section class='event__section  event__section--offers'>
                    <h3 class='event__section-title  event__section-title--offers'>Offers</h3>

                    <div class='event__available-offers'>
                    ${createOffers(getOffers(), type)}
                    </div>
                  </section>

                  <section class='event__section  event__section--destination'>
                    <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
                    <p class='event__destination-description'>
                      ${
                        destination !== undefined ? destination.description : ''
                      }
                    </p>

                    ${
                      destination !== undefined ? createImages(destination) : ''
                    }
                  </section>
                </section>
              </form>`;
};

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepicker = null;

  constructor({ point = BLANK_POINT, onFormSubmit, onDeleteClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event--edit .event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);
    this.element
      .querySelectorAll('.event__type-input')
      .forEach((item) =>
        item.addEventListener('change', this.#typeChangeHandler)
      );
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parsePointToState(this._state));
  };

  #typeChangeHandler = (evt) => {
    const changeType = evt.target.value;
    this.updateElement({
      type: changeType,
    });
  };

  #destinationChangeHandler = (evt) => {
    const changeDestination = evt.target.value;
    const destinations = getDestination().find(
      (item) => item.name === changeDestination
    );
    this.updateElement({
      destination: destinations,
    });
  };

  #startDateChangeHendler = ([useData]) =>
    this.updateElement({
      timeStart: useData,
    });

  #endDateChangeHendler = ([useData]) => {
    this.updateElement({
      timeEnd: useData,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    return point;
  }

  #setStartDatepicker() {
    this.#datepicker = flatpickr(
      this.element.querySelectorAll('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#startDateChangeHendler,
      }
    );
  }

  #setEndDatepicker() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#endDateChangeHendler,
      }
    );
  }
}
