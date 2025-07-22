import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class DestinationApiService extends ApiService {
  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }
}
