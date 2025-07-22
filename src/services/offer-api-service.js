import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class OfferApiService extends ApiService {
  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }
}
