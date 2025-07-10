import { getRandomArrayElement } from '../utils/common';
import { TYPE_OF_ROUTE } from '../const';
import { getRandomDestination } from './destination';
import { getRandomOffers } from './offers';
import { generateRandomDayjsDate } from '../utils/point';
import { nanoid } from 'nanoid';

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
    cost: 15,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 1000,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 0,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 5,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 125,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 50,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 33,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 45,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 782,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 64,
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints),
  };
}

export { getRandomPoint };
