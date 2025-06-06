// import NewTaskButtonView from './view/new-task-button-view.js';
import ListFilterView from './view/list-filter-view';
import {render} from './render.js';
import TripPresenter from './presenter/trip-presenter';

const tripControlsFilterElement = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({tripContainer: tripControlsFilterElement, listEventsContainer: tripEvents});

// render(new ListFilterView(), tripControlsFilterElement);
// render(new ListSortView(), tripEvents);
// render(new ListEventView(), tripEvents);

tripPresenter.init();


// render(new FilterView(), this.tripComponent.getElement());