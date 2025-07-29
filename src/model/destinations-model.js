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
      throw new Error('Failed to load latest route information (destination)');
    }
    this._notify(UpdateType.INIT);
  }
}
