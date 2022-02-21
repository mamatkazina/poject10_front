export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return res.json().then((data) => {
        // throw { code: res.status, message: data.message };
        throw new Error(data.message);
      });
    }

    if (res.status === 201 || res.status === 204) {
      return;
    }

    return res.json();
  }

  listFavouritePlaces() {
    return fetch(this._baseUrl + "/favourites", {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  showFavouritePlace(fpId) {
    return fetch(this._baseUrl + "/favourites/" + fpId, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  newFavouritePlace(fp) {
    return fetch(this._baseUrl + "/favourites", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(fp),
    }).then(this._getResponseData);
  }

  deleteFavouritePlace(fpId) {
    return fetch(this._baseUrl + "/favourites/" + fpId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editFavouritePlace(fp) {
    return fetch(this._baseUrl + "/favourites/" + fp.id, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(fp),
    }).then(this._getResponseData);
  }

  //Блок обработки маршрутов
  listRoutes() {
    return fetch(this._baseUrl + "/routes", {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  showRoutes(routeId) {
    return fetch(this._baseUrl + "/routes/" + routeId, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  newRoutes(route) {
    return fetch(this._baseUrl + "/routes", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(route),
    }).then(this._getResponseData);
  }

  deleteRoutes(routeId) {
    return fetch(this._baseUrl + "/routes/" + routeId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editRoutes(route) {
    return fetch(this._baseUrl + "/routes/" + route.id, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(route),
    }).then(this._getResponseData);
  }

  //Блок обработки типов маршрутов
  listTypeRoutes() {
    return fetch(this._baseUrl + "/typeRoutes", {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  showTypeRoutes(typerouteId) {
    return fetch(this._baseUrl + "/typeRoutes/" + typerouteId, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  newTypeRoutes(troute) {
    return fetch(this._baseUrl + "/typeRoutes", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(troute),
    }).then(this._getResponseData);
  }

  deleteTypeRoutes(typerouteId) {
    return fetch(this._baseUrl + "/typeRoutes/" + typerouteId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  editTypeRoutes(troute) {
    return fetch(this._baseUrl + "/typeRoutes/" + troute.id, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(troute),
    }).then(this._getResponseData);
  }
}
