import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OfferModel extends Observable {
  #offerApiService = null;
  #offers = [];

  constructor({ offerApiService }) {
    super();
    this.#offerApiService = offerApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offerApiService.offers;
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }
}
