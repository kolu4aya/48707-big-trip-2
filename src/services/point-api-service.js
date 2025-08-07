import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'date_from':
        point.timeStart instanceof Date ? point.timeStart.toISOString() : null, // На сервере дата хранится в ISO формате
      'date_to':
        point.timeEnd instanceof Date ? point.timeEnd.toISOString() : null, // На сервере дата хранится в ISO формате
      'base_price': Number(point.cost),
      'is_favorite': point.favorite,
      'offers': point.offers ? point.offers.map((offer) => offer.id) : [],
      'destination': point.destination.id,

    };

    delete adaptedPoint.timeStart;
    delete adaptedPoint.timeEnd;
    delete adaptedPoint.cost;
    delete adaptedPoint.favorite;
    delete adaptedPoint.isDeleting;
    delete adaptedPoint.isDisabled;
    delete adaptedPoint.isSaving;
    delete adaptedPoint.isNew;
    return adaptedPoint;
  }
}
