import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import { generateFilter } from './mock/filter.js';
import { render } from './framework/render';
import ListFilterView from './view/list-filter-view';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({
  filterContainer,
  listEventsContainer: tripEventsContainer,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);
render(new ListFilterView({ filters }), filterContainer);

tripPresenter.init();