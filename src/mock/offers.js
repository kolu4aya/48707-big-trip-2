import {
  getRandomArrayElement,
  getRandomArrayElementNum,
  getRandomNumber,
} from '../utils/common';
import { TYPE_OF_ROUTE } from '../const.js';

const mockOffers = [
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    title: 'Order Uber',
    price: 20,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    title: 'Add luggage',
    price: 50,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    title: 'Switch to comfort',
    price: 80,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    title: 'Rent a car',
    price: 200,
  },
  {
    type: getRandomArrayElement(TYPE_OF_ROUTE),
    title: 'Add breakfast',
    price: 50,
  },
];

function getRandomOffers() {
  return getRandomArrayElementNum(mockOffers, getRandomNumber(mockOffers));
}

function getOffers() {
  return mockOffers;
}
export { getRandomOffers, getOffers };
