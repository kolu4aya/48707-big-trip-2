import TripPresenter from "./presenter/trip-presenter";
import PointsModel from "./model/points-model";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripEventsContainer = document.querySelector(".trip-events");
const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({
  filterContainer,
  listEventsContainer: tripEventsContainer,
  pointsModel,
});
tripPresenter.init();
const el = document.querySelectorAll(".event__input--time")
    console.log(el)
    el.forEach((item) =>  flatpickr(item, {
      enableTime: true,
      dateFormat: "d/m/Y H:i"
    }))
