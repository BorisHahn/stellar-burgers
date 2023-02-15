import { mainURL } from '../utils/const';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getIngredients() {
    return fetch(this._baseUrl + '/ingredients').then((res) =>
      this._getResponseData(res),
    );
  }

  makeAnOrder(data) {
    return fetch(this._baseUrl + '/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const api = new Api({
  baseUrl: mainURL,
});

export default api;
