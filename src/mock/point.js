import { getRandomArrayElement } from '../utils/common';
import { TYPE_OF_ROUTE } from '../const';
import { getRandomDestination } from './destination';
import { getRandomOffers } from './offers';
import { generateRandomDayjsDate } from '../utils/point';

const mockPoints = [
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
