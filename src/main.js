import TripPresenter from './presenter/trip-presenter';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({filterContainer: filterContainer, listEventsContainer: tripEventsContainer});

tripPresenter.init();
