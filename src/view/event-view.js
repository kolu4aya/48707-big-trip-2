import AbstractView from '../framework/view/abstract-view';
import { humanizePointDate } from '../utils/point';

function createTaskTemplate(point) {
  const { type, destination, offers, timeStart, timeEnd, favorite, cost } =
    point;

  function offersToString(items) {
    return items
      .map(
        (item) =>
          `<li class='event__offer'>
          <span class='event__offer-title'>${item.title}</span>&plus;&euro;&nbsp;
          <span class='event__offer-price'>${item.price}</span>
        </li>`
      )
      .join('');
  }
  const date = humanizePointDate(timeStart, 'MMM DD');
  const dateAtr = humanizePointDate(timeStart, 'YYYY-MM-DD');
  const dateTimeStart = humanizePointDate(timeStart, 'YYYY-MM-DDTHH:mm');
  const timeStartHumanize = humanizePointDate(timeStart, 'HH:mm');
  const dateTimeEnd = humanizePointDate(timeEnd, 'YYYY-MM-DDTHH:mm');
  const timeEndHumanize = humanizePointDate(timeEnd, 'HH:mm');
  const millisecondsInSecond = 1000;
  const duration =
    Math.floor(timeEnd.getTime() / millisecondsInSecond) -
    Math.floor(timeStart.getTime() / millisecondsInSecond);
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute ** 2;
  const hoursInDay = 24;
  const secondsInDay = secondsInHour * hoursInDay;
  const d = Math.floor(duration / secondsInDay);
  const h = Math.floor((duration - d * secondsInDay) / secondsInHour);
  const m = Math.floor((duration - d * secondsInDay - h * secondsInHour) / secondsInMinute);
  let labelDuration = '';
  if (d > 0) {
    labelDuration = `${d < 10 ? `0${d}` : d}D ${h < 10 ? `0${h}` : h}H ${m < 10 ? `0${m}` : m}M`;
  } else if (h > 0) {
    labelDuration = `${h < 10 ? `0${h}` : h}H ${m < 10 ? `0${m}` : m}M`;
  } else {
    labelDuration = `${m < 10 ? `0${m}` : m}M`;
  }

  const favoriteClassName = favorite ? 'event__favorite-btn--active' : '';

  return `<li class='trip-events__item'><div class='event'>
            <time class='event__date' datetime='${dateAtr}'>${date}</time>
            <div class='event__type'>
              <img class='event__type-icon' width='42' height='42' src='img/icons/${type.toLowerCase()}.png' alt='Event type icon'>
            </div>
            <h3 class='event__title'>${type} ${destination ? destination.name : 'Empty destination'}</h3>
            <div class='event__schedule'>
              <p class='event__time'>
                <time class='event__start-time' datetime='${dateTimeStart}'>${timeStartHumanize}</time>
                &mdash;
                <time class='event__end-time' datetime='${dateTimeEnd}'>${timeEndHumanize}</time>
              </p>
              <p class='event__duration'>${labelDuration}</p>
            </div>
            <p class='event__price'>
              &euro;&nbsp;<span class='event__price-value'>${cost}</span>
            </p>
            <h4 class='visually-hidden'>Offers:</h4>
            <ul class='event__selected-offers'>
            ${offersToString(offers)}
            </ul>
            <button class='event__favorite-btn ${favoriteClassName}' type='button'>
              <span class='visually-hidden'>Add to favorite</span>
              <svg class='event__favorite-icon' width='28' height='28' viewBox='0 0 28 28'>
                <path d='M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z'/>
              </svg>
            </button>
            <button class='event__rollup-btn' type='button'>
              <span class='visually-hidden'>Open event</span>
            </button>
          </div></li>`;
}

export default class EventView extends AbstractView {
  #point = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;

    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTaskTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
