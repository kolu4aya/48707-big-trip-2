import { getRandomArrayElement } from "../utils/common";
import { TYPE_OF_ROUTE } from "../const";
import { getRandomDestination } from "./destination";
import { getRandomOffers } from "./offers";
import { generateRandomDayjsDate } from "../utils/point";
import { nanoid } from "nanoid";

const mockPoints = [
  {
    type: "Taxi",
    destination: getRandomDestination(),
    offers: getRandomOffers("Taxi"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 20,
  },
  {
    type: "Bus",
    destination: getRandomDestination(),
    offers: getRandomOffers("Bus"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 15,
  },
  {
    type: "Train",
    destination: getRandomDestination(),
    offers: getRandomOffers("Train"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 1000,
  },
  {
    type: "Ship",
    destination: getRandomDestination(),
    offers: getRandomOffers("Ship"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 0,
  },
  {
    type: "Drive",
    destination: getRandomDestination(),
    offers: getRandomOffers("Drive"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 5,
  },
  {
    type: "Flight",
    destination: getRandomDestination(),
    offers: getRandomOffers("Flight"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 125,
  },
  {
    type: "Check-in",
    destination: getRandomDestination(),
    offers: getRandomOffers("Check-in"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 50,
  },
  {
    type: "Sightseeing",
    destination: getRandomDestination(),
    offers: getRandomOffers("Sightseeing"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 33,
  },
  {
    type: "Restaurant",
    destination: getRandomDestination(),
    offers: getRandomOffers("Restaurant"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 45,
  },
  {
    type: "Taxi",
    destination: getRandomDestination(),
    offers: getRandomOffers("Taxi"),
    timeStart: generateRandomDayjsDate().dateFrom,
    timeEnd: generateRandomDayjsDate().dateTo,
    favorite: true,
    cost: 782,
  },
  {
    type: "Bus",
    destination: getRandomDestination(),
    offers: getRandomOffers("Bus"),
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
