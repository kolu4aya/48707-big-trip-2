import Observable from '../framework/observable';
import { UpdateType } from '../const.js';

export default class PointModel extends Observable {
  #pointApiService = null;
  #points = [];
  #destinationModel = null;
  #offerModel = null;

  constructor({ pointApiService, destinationModel, offerModel }) {
    super();
    this.#pointApiService = pointApiService;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      const destinations = this.#destinationModel.destinations;
      const offers = this.#offerModel.offers;
      this.#points = points.map(this.#adaptToClient);

      this.#points = this.#adaprToClientOffersAndDestination(
        this.#points,
        offers,
        destinations
      );
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error("Can't update unexisting point");
    }

    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (error) {
      throw new Error("Can't update point");
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (error) {
      throw new Error("Can't add point");
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error("Can't delete unexisting point");
    }

    try {
      await this.#pointApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (error) {
      throw new Error("Can't delete point");
    }
  }

  #adaptToClient(point) {
    const adaptedPont = {
      ...point,
      timeStart:
        point['date_from'] !== null
          ? new Date(point['date_from'])
          : point['date_from'],
      timeEnd:
        point['date_to'] !== null
          ? new Date(point['date_to'])
          : point['date_to'],
      cost: point['base_price'],
      favorite: point['is_favorite'],
    };

    delete adaptedPont['date_from'];
    delete adaptedPont['date_to'];
    delete adaptedPont['base_price'];
    delete adaptedPont['is_favorite'];

    return adaptedPont;
  }

  #adaprToClientOffersAndDestination(points, offers, destinations) {
    points = points.map((point) => {
      point.offers = offers
        .find((offer) => offer.type == point.type)
        .offers.filter((offer) =>
          point.offers.find((offerInPoint) => offerInPoint == offer.id)
        );

      point.destination = destinations.find(
        (destination) => destination.id == point.destination
      );

      return point;
    });

    return points;
  }
}
