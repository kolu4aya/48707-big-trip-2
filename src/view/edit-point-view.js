import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { TYPE_OF_ROUTE } from '../const';
import { humanizePointDate } from '../utils/point';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: 'flight',
  destination: null,
  offers: [],
  timeStart: '',
  timeEnd: '',
  favorite: false,
  cost: 0,
  isNew: true,
};

const createEditPointTemplate = (data, allOffers, destinations) => {
  const {
    type,
    destination,
    offers,
    timeStart,
    timeEnd,
    cost,
    isSaving,
    isDeleting,
    isDisabled,
    isNew,
  } = data;

  const createTypes = (items = TYPE_OF_ROUTE) =>
    items
      .map((item) => {
        const typeLow = item.toLowerCase();
        const checked = typeLow === type ? ' checked=true' : '';
        return `<div class='event__type-item'>
              <input id='event-type-${typeLow}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${item}' ${checked}>
              <label class='event__type-label  event__type-label--${typeLow}' for='event-type-${typeLow}-1'>${item}</label>
            </div>`;
      })
      .join('');

  const createDestinations = (items = []) =>
    items.map((item) => `<option value='${item.name}'></option>`).join('');

  const createOffers = (items = [], typeForOffer = 'flight') => {
    items = items.find(
      (item) => item.type === typeForOffer.toLowerCase()
    ).offers;
    return items
      .map((item) => {
        const itemAtr = item.title.split(item.title.split(' ').length - 1);
        const checked = offers.find((offer) => offer.id === item.id) ? ' checked' : '';

        return `<div class='event__offer-selector'>
                <input class='event__offer-checkbox  visually-hidden' id='event-offer-${itemAtr}-1' type='checkbox' name='event-offer-${itemAtr}' ${checked} data-offerId = ${item.id}>
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
      str = '<div class="event__photos-container"><div class="event__photos-tape">';
      str += pictures.map((item) =>`<img class='event__photo' src='${item.src}' alt='${item.alt}'>`);
      str += '</div></div>';
    }

    return str;
  };

  const dateStart = humanizePointDate(timeStart, 'DD/MM/YY HH:mm');
  const dateEnd = humanizePointDate(timeEnd, 'DD/MM/YY HH:mm');

  const newButtonText = isDeleting ? 'canceling...' : 'cancel';
  const existingButtonText = isDeleting ? 'deleting...' : 'delete';
  const resetButtonText = isNew ? newButtonText : existingButtonText;

  return `<li class='trip-events__item'><form class='event event--edit' action='#' method='post'>
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
                    <input class='event__input  event__input--destination' id='event-destination-1' autocomplete='off' type='text' name='event-destination' required value='${destination ? destination.name : ''}' list='destination-list-1'>
                    <datalist id='destination-list-1'>
                      ${createDestinations(destinations)}
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
                    <input class='event__input  event__input--price' id='event-price-1' type='text' name='event-price' value='${cost > 0 ? cost : 0}'>
                  </div>

                  <button class='event__save-btn  btn  btn--blue' type='submit' ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
                  <button class='event__reset-btn' type='reset' ${isDisabled ? 'disabled' : ''}> ${resetButtonText}</button>
                  <button class='event__rollup-btn' type='button'>
                    <span class='visually-hidden'>Open event</span>
                  </button>
                </header>
                ${createOffers(allOffers, type) !== '' ? `<section class='event__details'>
                  <section class='event__section  event__section--offers'>
                    <h3 class='event__section-title  event__section-title--offers'>Offers</h3>

                    <div class='event__available-offers'>
                    ${createOffers(allOffers, type)}
                    </div>
                  </section>` : ''}
                  ${destination && destination.description ? `<section class='event__section  event__section--destination'>
                    <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
                    <p class='event__destination-description'>
                       ${destination.description}
                    </p>

                    ${destination !== undefined ? createImages(destination) : ''}
                  </section>` : ''}
                </section>
              </form></li>`;
};

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCancelClick = null;

  #startDatepicker = null;
  #endDatepicker = null;
  #offers = [];
  #destinations = [];

  constructor({
    point = BLANK_POINT,
    onFormSubmit,
    onDeleteClick,
    onCancelClick,
    offers,
    destinations,
  }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCancelClick = onCancelClick;
    this.#offers = offers;
    this.#destinations = destinations;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }
    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  get template() {
    return createEditPointTemplate(
      this._state,
      this.#offers,
      this.#destinations
    );
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event--edit .event__rollup-btn')
      .addEventListener('click', this.#handleCancelClick);
    this.element
      .querySelectorAll('.event__type-input')
      .forEach((item) =>
        item.addEventListener('change', this.#typeChangeHandler)
      );
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('keyup', this.#priceChangeHandler);
    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((offer) =>
        offer.addEventListener('change', this.#offerChangeHandler)
      );
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
    const changeType = evt.target.value.toLowerCase();

    this._state.offers = [];
    this.updateElement({
      type: changeType,
    });
  };

  #offerChangeHandler = (evt) => {
    const offerElement = evt.target;
    const offerId = offerElement.dataset.offerid;
    const Alloffers = this.#offers.flatMap((category) => category.offers);
    const offer = Alloffers.find((item) => item.id === offerId);
    const point = this._state;

    if (offerElement.checked) {
      point.offers.push(offer);
    } else {
      point.offers = this._state.offers.filter((item) => item.id !== offerId);
    }

    this.updateElement({
      offers: point.offers,
    });
  };

  #priceChangeHandler = (evt) => {
    const cost = evt.target.value;

    if (/\d{1,5}/.test(cost) && Number(cost) > 0 && Number(cost) < 100000) {
      this.updateElement({
        cost: Number(cost),
      });
    } else {
      evt.target.value = '';
    }
  };

  #destinationChangeHandler = (evt) => {
    const changeDestination = evt.target.value;
    const destinations = this.#destinations.find(
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
    return { ...point, isDisabled: false, isSaving: false, isDeleting: false };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  #setStartDatepicker() {
    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
    }

    const startInput = this.element.querySelector('#event-start-time-1');
    if (!startInput) {
      return;
    }

    this.#startDatepicker = flatpickr(startInput, {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      closeOnSelect: false, // Не закрывать после выбора
      static: true, // Статичное позиционирование
      onOpen: () => {
        // Принудительно показываем календарь
        setTimeout(() => {
          if (this.#startDatepicker.calendarContainer) {
            this.#startDatepicker.calendarContainer.style.display = 'block';
          }
        }, 0);
      },
      onChange: (selectedDates) => {
        this.#startDateChangeHendler(selectedDates);
        // После изменения даты оставляем календарь открытым
        if (this.#startDatepicker) {
          this.#startDatepicker.open();
        }
      },
    });
  }

  #setEndDatepicker() {
    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
    }

    const endInput = this.element.querySelector('#event-end-time-1');
    if (!endInput) {
      return;
    }

    this.#endDatepicker = flatpickr(endInput, {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      closeOnSelect: false, // Не закрывать после выбора
      static: true, // Статичное позиционирование
      onOpen: () => {
        // Принудительно показываем календарь
        setTimeout(() => {
          if (this.#endDatepicker.calendarContainer) {
            this.#endDatepicker.calendarContainer.style.display = 'block';
          }
        }, 0);
      },
      onChange: (selectedDates) => {
        this.#endDateChangeHendler(selectedDates);
        // После изменения даты оставляем календарь открытым
        if (this.#endDatepicker) {
          this.#endDatepicker.open();
        }
      },
    });
  }
}
