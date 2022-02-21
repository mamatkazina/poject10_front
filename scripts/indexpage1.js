import Api from "./api.js";
import { mapLoaded, map as mapBox } from "./map.js";
// import Datepicker from "vanillajs-datepicker/Datepicker";
// import Datepicker from "../node_modules/vanillajs-datepicker/js/Datepicker.js";

const api = new Api({
  baseUrl: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const mapMarkers = [];

let map = document.querySelector(".map");
let menu = map.querySelector(".menu");
let button = map.querySelector(".map__button");
let menuButtons = map.querySelectorAll(".menu__button");

const nameArray = ["Любимые места", "Трекер", "Маршруты"];

let fp = document.getElementById("favouritePl");
let routes = document.getElementById("routes");
let track = document.getElementById("track");

let list = document.querySelectorAll(".list");

let target;
const date = document.querySelector(".datepicker");

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
date.value = new Date().toDateInputValue();
let dateValue = date.value;
dateValue = Date.parse(dateValue);

function reload() {
  fp.setAttribute("disabled", true);
  routes.setAttribute("disabled", true);
  track.setAttribute("disabled", true);

  api
    .listFavouritePlaces()
    .then((data) => {
      const listPlaces = data;

      listPlaces.forEach((element) => {
        let li = document.createElement("li");
        li.setAttribute("class", "list__element");

        li.setAttribute("data-id", element.id);
        li.setAttribute("data-name", element.name);
        li.setAttribute("data-about", element.about);
        li.setAttribute("data-geom", JSON.stringify(element.geometry));

        let span = document.createElement("span");
        span.setAttribute("class", "list__text");

        span.innerText = element.name;
        li.appendChild(span);

        li.addEventListener("click", clickListElement);
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
        let li = document.createElement("li");
        li.setAttribute("class", "list__element");
        li.setAttribute("data-id", element.id);
        li.setAttribute("data-name", element.name);
        li.setAttribute("data-about", element.about);
        li.setAttribute("data-color", element.color);

        let span = document.createElement("span");
        span.setAttribute("class", "list__text");

        span.innerText = element.name;
        li.appendChild(span);

        li.addEventListener("click", clickListElement);
        list[1].appendChild(li);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}

function buttonClick() {
  menu.classList.toggle("menu_open");

  if (menu.classList.contains("menu_open")) {
    fp.removeAttribute("disabled", true);
    routes.removeAttribute("disabled", true);
    track.removeAttribute("disabled", true);
  } else {
    fp.setAttribute("disabled", true);
    routes.setAttribute("disabled", true);
    track.setAttribute("disabled", true);
  }

  menuButtons.forEach((item, i) => {
    item.children[0].classList.toggle("button__text_open");
    item.children[1].classList.toggle("button__img_open");
  });

  button.classList.toggle("map__button_back");

  if (!list[0].classList.contains("list__map_hidden")) {
    list[0].classList.add("list__map_hidden");
    addPlace.classList.add("menu__button_add-visibility");
  }

  if (!list[1].classList.contains("list__map_hidden"))
    list[1].classList.add("list__map_hidden");

  if (!list[2].classList.contains("list__map_hidden"))
    list[2].classList.add("list__map_hidden");

  checkMarkers();
}

function clickListElement(e) {
  // popup.classList.remove("map__popup_hidden");

  // popupInput.setAttribute("readonly", "true");
  // popupArea.setAttribute("readonly", "true");

  //popupDelete.classList.remove("popup__delete_hidden");
  // popupEdit.classList.remove("popup__edit_hidden");
  // popupAdd.classList.add("popup__add_hidden");
  // popupDelete.classList.add("popup__delete_hidden");
  // popupSubmit.classList.add("popup__submit_hidden");
  // popupEdit.addEventListener("click", editForm);

  target = e.currentTarget;
}

function deleteForm(e) {
  e.preventDefault();

  let form = e.currentTarget.parentElement;
  let name = form.querySelector("#popupName");
  let about = form.querySelector("#popupAbout");
  let id = form.querySelector("#popupId");
  let color = form.querySelector("#popupColor");
  let geom = form.querySelector("#popupGeom");

  if (mapMarkers.length != 0) {
    let favPl = {};

    favPl.id = id.value;
    favPl.name = name.value;
    favPl.about = about.value;
    favPl.geometry = JSON.parse(geom.value);

    api
      .deleteFavouritePlace(favPl.id)
      .then((data) => {
        for (let item of list[0].children) {
          if (item.dataset.id == id.value) {
            item.remove();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //closeForm();
      });
  } else if (e.currentTarget.parentElement.id == "routeList") {
    let routes = {};

    routes.id = id.value;
    routes.name = name.value;
    routes.about = about.value;
    routes.color = color.value;

    api
      .deleteTypeRoutes(routes.id)
      .then((data) => {
        target.remove();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //closeForm();
      });
  }
}

function submitForm(e) {
  e.preventDefault();

  let form = e.currentTarget.parentElement;
  let name = form.querySelector("#popupName");
  let about = form.querySelector("#popupAbout");
  let id = form.querySelector("#popupId");
  let color = form.querySelector("#popupColor");
  let geom = form.querySelector("#popupGeom");

  let textSpan = form.querySelector(".list__text");
  // if (e.currentTarget.parentElement.id == "fpList") {
  if (mapMarkers.length != 0) {
    let favPl = {};

    favPl.id = id.value;
    favPl.name = name.value;
    favPl.about = about.value;
    favPl.geometry = JSON.parse(geom.value);

    api
      .editFavouritePlace(favPl)
      .then((data) => {
        for (let item of list[0].children) {
          if (item.dataset.id == id.value) {
            textSpan.textContent = name.value;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //closeForm();
      });
  } else if (e.currentTarget.parentElement.id == "routeList") {
    let routes = {};

    routes.id = parseInt(id.value);
    routes.name = name.value;
    routes.about = about.value;
    routes.color = color.value;

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
        //closeForm();
      });
  }
}

function checkMarkers() {
  if (list[0].classList.contains("list__map_hidden")) {
    for (let marker of mapMarkers) {
      marker.remove();
    }
  }
}

function editForm(e) {
  e.preventDefault();

  let form = e.currentTarget.parentElement;
  let popupDelete = form.querySelector(".popup__delete");
  let popupSubmit = form.querySelector(".popup__submit");
  let popupEdit = form.querySelector(".popup__edit");
  let popupInput = form.querySelector(".popup__input");
  let popupArea = form.querySelector(".popup__textarea");

  popupInput.removeAttribute("readonly", true);
  popupArea.removeAttribute("readonly", true);
  popupDelete.classList.remove("popup__delete_hidden");
  popupSubmit.classList.remove("popup__submit_hidden");
  popupEdit.classList.add("popup__edit_hidden");
}

fp.addEventListener("click", VisibilityF);
routes.addEventListener("click", VisibilityR);
track.addEventListener("click", VisibilityT);

function VisibilityF() {
  list[0].classList.toggle("list__map_hidden");

  if (list[0].classList.contains("list__map_hidden")) {
    for (let marker of mapMarkers) {
      marker.remove();
    }
  } else {
    if (mapLoaded) {
      let children = document.getElementById("fpList").children;

      for (let item of children) {
        const popupElement = document
          .querySelector("#popup")
          .content.querySelector(".map__popup")
          .cloneNode(true);

        let name = popupElement.querySelector("#popupName");
        name.value = item.dataset.name;
        let about = popupElement.querySelector("#popupAbout");
        about.value = item.dataset.about;
        let id = popupElement.querySelector("#popupId");
        id.value = item.dataset.id;
        // let color = popupElement.querySelector("#popupColor");
        // color.value = item.dataset.color;
        let geom = popupElement.querySelector("#popupGeom");
        geom.value = item.dataset.geom;

        const geometry = JSON.parse(item.dataset.geom);
        const marker = new mapboxgl.Marker()
          .setLngLat(geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup() // add popups
              .setDOMContent(popupElement)
          );
        //marker.fp = item.dataset;
        marker.addTo(mapBox);
        mapMarkers.push(marker);

        let popupDelete = popupElement.querySelector(".popup__delete");
        let popupSubmit = popupElement.querySelector(".popup__submit");
        let popupEdit = popupElement.querySelector(".popup__edit");

        // popupDelete.classList.add("popup__delete_hidden");
        // popupSubmit.classList.add("popup__submit_hidden");
        // popupEdit.classList.remove("popup__edit_hidden");

        popupDelete.addEventListener("click", deleteForm);
        popupSubmit.addEventListener("click", submitForm);
        popupEdit.addEventListener("click", editForm);
      }
    }
  }
}

function VisibilityR() {
  list[1].classList.toggle("list__map_hidden");
  checkMarkers();

  // if (list[0].classList.contains("list__map_hidden")) {
  //   for (let marker of mapMarkers) {
  //     marker.remove();
  //   }
  // } else {
  //   if (mapLoaded) {
  //     let children = document.getElementById("routeList").children;

  //     for (let item of children) {
  //       const LinePopupElement = document
  //         .querySelector("#popup")
  //         .content.querySelector(".map__popup")
  //         .cloneNode(true);

  //       let name = popupElement.querySelector("#linePopupName");
  //       name.value = item.dataset.name;
  //       let about = popupElement.querySelector("#linePopupAbout");
  //       about.value = item.dataset.about;
  //       let id = popupElement.querySelector("#linePopupId");
  //       id.value = item.dataset.id;
  //       let color = popupElement.querySelector("#linePopupColor");
  //       color.value = item.dataset.color;
  //       let geom = popupElement.querySelector("#linePopupGeom");
  //       geom.value = item.dataset.geom;

  //       const geometry = JSON.parse(item.dataset.geom);
  //       const marker = new mapboxgl.Marker()
  //         .setLngLat(geometry.coordinates)
  //         .setPopup(
  //           new mapboxgl.Popup() // add popups
  //             .setDOMContent(popupElement)
  //         );
  //       //marker.fp = item.dataset;
  //       marker.addTo(mapBox);
  //       mapMarkers.push(marker);
  //     }
  //   }
  // }
}

function VisibilityT() {
  list[2].classList.toggle("list__map_hidden");
  checkMarkers();
}

function addForm(e) {
  e.preventDefault();

  let form = e.currentTarget.parentElement;
  let name = form.querySelector("#popupName");
  let about = form.querySelector("#popupAbout");

  let favPl = {};

  favPl.id = 0;
  favPl.name = name.value;
  favPl.about = about.value;
  favPl.geometry = JSON.stringify(e.lngLat.wrap());

  api
    .newFavouritePlace(favPl)
    .then((data) => {
      let li = document.createElement("li");
      li.setAttribute("class", "list__element");

      li.setAttribute("data-id", favPl.id);
      li.setAttribute("data-name", favPl.name);
      li.setAttribute("data-about", favPl.about);
      li.setAttribute("data-geom", JSON.stringify(favPl.geometry));

      let span = document.createElement("span");
      span.setAttribute("class", "list__text");

      span.innerText = favPl.name;
      li.appendChild(span);

      list[0].appendChild(li);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //closeForm();
    });
}

function addPopup(e) {
  const createNewPopup = document
    .querySelector("#createNewPopup")
    .content.querySelector(".map__popup")
    .cloneNode(true);

  // mapBox.setPopup(
  //   new mapboxgl.Popup() // add popups
  //     .setDOMContent(createNewPopup)
  // );

  // const popup = new mapboxgl.Popup({ closeOnClick: false })
  //   .setLngLat([-96, 37.8])
  //   .setHTML("<h1>Hello World!</h1>")
  //   .addTo(map);

  //

  const marker = new mapboxgl.Marker().setLngLat(e.lngLat.wrap()).setPopup(
    new mapboxgl.Popup({ closeOnClick: true }) // add popups
      .setDOMContent(createNewPopup)
  );

  marker.addTo(mapBox);

  // let favPl = {};
  // favPl.id = idOf.value;
  // favPl.name = nameOf.value;
  // favPl.about = aboutOf.value;
  // favPl.point = geomOf.value;
  //let form = e.currentTarget.parentElement;
  //let popupAdd = form.querySelector(".popup__add");
  //popupAdd.addEventListener("click", addForm);
}

reload();

button.addEventListener("click", buttonClick);
// addPlace.addEventListener("click", addplace);

mapBox.on("contextmenu", (e) => {
  addPopup(e);
});
