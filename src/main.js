import { render } from './framework/render.js';
import { generatingAuthString } from './utils/common';

import PointApiService from './services/point-api-service.js';
import DestinationApiService from './services/destination-api-service.js';
import OfferApiService from './services/offer-api-service.js';

import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import OfferModel from './model/offers-model';
import DestinationModel from './model//destinations-model';

import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';

import NewPointButtonView from './view/new-point-button-view';

const AUTHORIZATION = `Basic ${generatingAuthString()}`;
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const tripMainContainer = document.querySelector('.trip-main');

const offerModel = new OfferModel({
  offerApiService: new OfferApiService(END_POINT, AUTHORIZATION),
});
const destinationModel = new DestinationModel({
  destinationApiService: new DestinationApiService(END_POINT, AUTHORIZATION),
});
const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION),
  offerModel,
  destinationModel,
});

const filterModel = new FilterModel();
const tripPresenter = new TripPresenter({
  listEventsContainer: tripEventsContainer,
  pointsModel,
  filterModel,
  offerModel,
  destinationModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripPresenter.init();
Promise.all([offerModel.init(), destinationModel.init(), pointsModel.init()])
  .then(() => {
    render(newPointButtonComponent, tripMainContainer);
  })
  .catch((e) => {
    console.log(e)
    tripPresenter.handleLoadingError();
  });
