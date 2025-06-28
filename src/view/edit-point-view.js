import AbstractView from '../framework/view/abstract-view.js';
import { TYPE_OF_ROUTE } from '../const';
import { getDestination } from '../mock/destination';
import { getOffers } from '../mock/offers';
import { humanizeTaskDueDate } from '../utils';

const BLANK_POINT = {
  type: TYPE_OF_ROUTE[5],
  destination: '',
  offers: '',
  timeStart: '',
  timeEnd: '',
  favorite: false,
  cost: 0,
};

function createEditPointTemplate(data) {
  const { type, destination, offers, timeStart, timeEnd, cost } = data;

  function typesToString(items = TYPE_OF_ROUTE) {
    return items
      .map((item) => {
        const typeLow = item.toLowerCase();
        const checked = item === type ? ' checked' : '';
        return `<div class='event__type-item'>
                <input id='event-type-${typeLow}-1' class='event__type-input  visually-hidden' type='radio' name='event-type' value='${typeLow}' ${checked}>
                <label class='event__type-label  event__type-label--${typeLow}' for='event-type-${typeLow}-1'>${item}</label>
              </div>`;
      })
      .join('');
  }

  function destinationsToString(items = []) {
    return items
      .map((item) => `<option value='${item.name}'></option>`)
      .join('');
  }

  function offersToString(items = []) {
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
  }

  const dateStart = humanizeTaskDueDate(timeStart, 'DD/MM/YYYY HH:mm');
  const dateEnd = humanizeTaskDueDate(timeEnd, 'DD/MM/YYYY HH:mm');

  return `<form class='event event--edit' action='#' method='post'>
                <header class='event__header'>
                  <div class='event__type-wrapper'>
                    <label class='event__type  event__type-btn' for='event-type-toggle-1'>
                      <span class='visually-hidden'>Choose event type</span>
                      <img class='event__type-icon' width='17' height='17' src='img/icons/flight.png' alt='Event type icon'>
                    </label>
                    <input class='event__type-toggle  visually-hidden' id='event-type-toggle-1' type='checkbox'>

                    <div class='event__type-list'>
                      <fieldset class='event__type-group'>
                        <legend class='visually-hidden'>Event type</legend>
                        ${typesToString()}
                      </fieldset>
                    </div>
                  </div>

                  <div class='event__field-group  event__field-group--destination'>
                    <label class='event__label  event__type-output' for='event-destination-1'>
                      ${type}
                    </label>
                    <input class='event__input  event__input--destination' id='event-destination-1' type='text' name='event-destination' value='
                    ${destination.name}' list='destination-list-1'>
                    <datalist id='destination-list-1'>
                      ${destinationsToString(getDestination())}
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
                    ${offersToString(getOffers())}
                    </div>
                  </section>

                  <section class='event__section  event__section--destination'>
                    <h3 class='event__section-title  event__section-title--destination'>Destination</h3>
                    <p class='event__destination-description'>
                    ${destination.description}</p>
                  </section>
                </section>
              </form>
              `;
}

export default class EditPointView extends AbstractView {
  #point = null;
  #handleFormSubmit = null;
  constructor({ point = BLANK_POINT, onFormSubmit }) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event--edit .event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
