import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationModel extends Observable {
  #destinationApiService = null;
  #destinations = [];

  constructor({ destinationApiService }) {
    super();
    this.#destinationApiService = destinationApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }
}
