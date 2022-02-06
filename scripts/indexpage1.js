import Api from './api.js';
import { mapLoaded, map as mapBox } from './map.js';
// import Datepicker from "vanillajs-datepicker/Datepicker";
// import Datepicker from "../node_modules/vanillajs-datepicker/js/Datepicker.js";

const api = new Api({
  baseUrl: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mapMarkers = [];

let map = document.querySelector('.map');

let menu = map.querySelector('.menu');
let button = map.querySelector('.map__button');
let buttonBack = map.querySelectorAll('.map__button_back');
let menuButtons = map.querySelectorAll('.menu__button');
let buttonImg = map.querySelectorAll('.button__img');
let buttonText = map.querySelectorAll('.button__text');
const nameArray = ['Любимые места', 'Трекер', 'Маршруты'];

let fp = document.getElementById('favouritePl');
let routes = document.getElementById('routes');
let track = document.getElementById('track');

let list = document.querySelectorAll('.list');
let nameOf = document.getElementById('1');
let aboutOf = document.getElementById('2');
let idOf = document.getElementById('3');
let colorOf = document.getElementById('4');
let geomOf = document.getElementById('5');

let popup = document.querySelector('.map__popup');
let popupClose = document.querySelector('.popup__close');
let popupDelete = document.querySelector('.popup__delete');
let popupEdit = document.querySelector('.popup__submit');
let target;
const date = document.querySelector('.datepicker');

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
date.value = new Date().toDateInputValue();
let dateValue = date.value;
dateValue = Date.parse(dateValue);

function reload() {
  api
    .listFavouritePlaces()
    .then((data) => {
      const listPlaces = data;

      listPlaces.forEach((element) => {
        let li = document.createElement('li');
        li.setAttribute('class', 'list__element');

        li.setAttribute('data-id', element.id);
        li.setAttribute('data-name', element.name);
        li.setAttribute('data-about', element.about);
        li.setAttribute('data-geom', JSON.stringify(element.geometry));

        let span = document.createElement('span');
        span.setAttribute('class', 'list__text');

        span.innerText = element.name;
        li.appendChild(span);

        li.addEventListener('click', clickListElement);
        list[0].appendChild(li);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});

  api
    .listTypeRoutes()
    .then((data) => {
      const typeRouteslist = data;

      typeRouteslist.forEach((element) => {
        let li = document.createElement('li');
        li.setAttribute('class', 'list__element');
        li.setAttribute('data-id', element.id);
        li.setAttribute('data-name', element.name);
        li.setAttribute('data-about', element.about);
        li.setAttribute('data-color', element.color);

        let span = document.createElement('span');
        span.setAttribute('class', 'list__text');

        span.innerText = element.name;
        li.appendChild(span);

        li.addEventListener('click', clickListElement);
        list[1].appendChild(li);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}

function buttonClick() {
  menu.classList.toggle('menu_open');

  if (menu.classList.contains('menu_open')) {
    fp.removeAttribute('disabled', true);
    routes.removeAttribute('disabled', true);
    track.removeAttribute('disabled', true);
  } else {
    fp.setAttribute('disabled', true);
    routes.setAttribute('disabled', true);
    track.setAttribute('disabled', true);
  }

  menuButtons.forEach((item, i) => {
    item.children[0].classList.toggle('button__text_open');
    item.children[1].classList.toggle('button__img_open');
  });

  button.classList.toggle('map__button_back');

  if (!list[0].classList.contains('list__map_hidden')) list[0].classList.add('list__map_hidden');

  if (!list[1].classList.contains('list__map_hidden')) list[1].classList.add('list__map_hidden');

  if (!list[2].classList.contains('list__map_hidden')) list[2].classList.add('list__map_hidden');
}

function clickListElement(e) {
  popup.classList.remove('map__popup_hidden');

  target = e.currentTarget;
  nameOf.value = e.currentTarget.dataset.name;
  aboutOf.value = e.currentTarget.dataset.about;
  idOf.value = e.currentTarget.dataset.id;
  colorOf.value = e.currentTarget.dataset.color;
  geomOf.value = e.currentTarget.dataset.geom;
  popup.querySelector('.form-container').id = target.parentElement.id;
}

function deleteForm(e) {
  if (e.currentTarget.parentElement.id == 'fpList') {
    let favPl = {};

    favPl.id = e.currentTarget.dataset.id;
    favPl.name = nameOf.value;
    favPl.about = aboutOf.value;
    favPl.point = e.currentTarget.dataset.geom;

    api
      .deleteFavouritePlace(favPl.id)
      .then((data) => {
        target.remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeForm();
      });
  } else if (e.currentTarget.parentElement.id == 'routeList') {
    let routes = {};

    routes.id = idOf.value;
    routes.name = nameOf.value;
    routes.about = aboutOf.value;
    routes.color = colorOf.value;

    api
      .deleteTypeRoutes(routes.id)
      .then((data) => {
        target.remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeForm();
      });
  }
}

function editForm(e) {
  if (e.currentTarget.parentElement.id == 'fpList') {
    let favPl = {};

    favPl.id = idOf.value;
    favPl.name = nameOf.value;
    favPl.about = aboutOf.value;
    // favPl.point = geomOf.value;
    api
      .editFavouritePlace(favPl)
      .then((data) => {
        target.innerText = nameOf.value;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeForm();
      });
  } else if (e.currentTarget.parentElement.id == 'routeList') {
    let routes = {};

    routes.id = idOf.value;
    routes.name = nameOf.value;
    routes.about = aboutOf.value;
    routes.color = colorOf.value;

    api
      .editTypeRoutes(routes)
      .then((data) => {
        target.innerText = nameOf.value;
        e.preventDefault();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeForm();
      });
  }
}

function closeForm() {
  popup.classList.add('map__popup_hidden');
}

fp.addEventListener('click', VisibilityF);
routes.addEventListener('click', VisibilityR);
track.addEventListener('click', VisibilityT);

function VisibilityF() {
  list[0].classList.toggle('list__map_hidden');

  if (list[0].classList.contains('list__map_hidden')) {
    for (let marker of mapMarkers) {
      marker.remove();
    }
  } else {
    if (mapLoaded) {
      let children = document.getElementById('fpList').children;

      for (let item of children) {
        const geometry = JSON.parse(item.dataset.geom);
        const marker = new mapboxgl.Marker().setLngLat(geometry.coordinates);
        marker.addTo(mapBox);
        mapMarkers.push(marker);

        console.log(geometry.coordinates);
      }
    }
  }
}

function VisibilityR() {
  list[1].classList.toggle('list__map_hidden');
}

function VisibilityT() {
  list[2].classList.toggle('list__map_hidden');
}

reload();
popupClose.addEventListener('click', closeForm);
popupDelete.addEventListener('click', deleteForm);
popupEdit.addEventListener('click', editForm);
button.addEventListener('click', buttonClick);
