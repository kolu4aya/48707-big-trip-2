import { getRandomArrayElement } from '../utils.js';
import { TYPE_OF_ROUTE } from '../const';
import { getRandomDestination } from './destination';
import { getRandomOffers } from './offers';


const mockPoints = [
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: new Date('2025-03-18T10:30:00.000'),
    timeEnd: new Date('2025-03-18T11:00:00.000'),
    favorite: true,
    cost: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: new Date('2025-03-18T12:25:00.000'),
    timeEnd: new Date('2025-03-18T13:35:00.000'),
    favorite: false,
    cost: 160,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: new Date('2025-03-18T14:30:00.000'),
    timeEnd: new Date('2025-03-19T16:05:00.000'),
    favorite: false,
    cost: 160,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    destination: getRandomDestination(),
    offers: getRandomOffers(),
    timeStart: new Date('2025-03-18T16:20:00.000'),
    timeEnd: new Date('2025-03-19T17:00:00.000'),
    favorite: false,
    cost: 600,
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint };
