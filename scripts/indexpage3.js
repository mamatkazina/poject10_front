import Api from "./api.js";

const api = new Api({
  baseUrl: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let list = document.querySelector(".admin__list");

let buttons = document.querySelectorAll(".list__button");
//let text, id, about, color, typeOfId, pointsArray;

let nameOf = document.getElementById("1");
let idOf = document.getElementById("2");
let typeOfId = document.getElementById("3");
let aboutOf = document.getElementById("4");
let colorOf = document.getElementById("5");
let pointsOf = document.getElementById("6");

let submit = document.querySelector(".admin__submit");

api
  .listRoutes()
  .then((data) => {
    const listRoutes = data;

    console.log(data);
    console.log(listRoutes);

    listRoutes.forEach((element) => {
      let li = document.createElement("li");
      li.setAttribute("class", "admin__list-element");
      li.setAttribute("data-id", element.id);
      li.setAttribute("data-typeRouteId", element.id);
      li.setAttribute("data-name", element.name);
      li.setAttribute("data-about", element.about);
      li.setAttribute("data-color", element.color);
      li.setAttribute("data-geom", element.geom);

      let span = document.createElement("span");
      span.setAttribute("class", "list__text");
      span.innerText = element.name;
      li.appendChild(span);

      let button = document.createElement("button");
      button.setAttribute("class", "button admin__list-button");
      li.appendChild(button);

      li.addEventListener("click", clickListElement);
      list.appendChild(li);
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {});

// for (let item of elements) {
//   item.insertAdjacentHTML(
//     "beforeEnd",
//     '<button class="list__button-img"></button>'
//   );

//   item.lastChild.onclick = function () {
//     item.remove();
//   };
// }

// for (let element of list) {
//   element.onclick = function () {
//     // text = i.getAttribute("aria-label");
//     // id = i.getAttribute("id");
//     // about = i.getAttribute("about");
//     // nameOf.value = text;
//     // idOf.value = id;
//     // aboutOf.value = about;

//     nameOf.value = i.dataset.name;
//     idOf.value = i.dataset.id;
//     typeOfId.value = i.dataset.typeRouteId;
//     aboutOf.value = i.dataset.about;
//     colorOf.value = i.dataset.color;
//     pointsOf.value = i.dataset.geom;
//   };
// }

function clickListElement(e) {
  if (e.target.localName == "button") {
  } else {
    nameOf.value = e.currentTarget.dataset.name;
    idOf.value = e.currentTarget.dataset.id;
    typeOfId.value = e.currentTarget.dataset.typeRouteId;
    aboutOf.value = e.currentTarget.dataset.about;
    colorOf.value = e.currentTarget.dataset.color;
    pointsOf.value = e.currentTarget.dataset.geom;
  }
}

function change(e) {
  let routes = {
    name: "qqq2222q1",
    typeRouteId: "1",
    about: "aaa3333a1",
    color: "green",
    icon: "fds",
    geometry: { type: "Point", coordinates: [37.6171875, 55.7642131648377] },
  };

  api
    .newRoutes(routes)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});

  api
    .listRoutes()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});

  buttons[0].innerHTML = nameOf.value;
  // и тут в  будущем заменить остальные через апи

  // text = nameOf.value;
  // id = idOf.value;
  // about = aboutOf.value;
  // color = colorOf.value;
  // typeOfId = typeOfId.value;
  // pointsArray = pointsOf.value;
}

function create() {
  let routes = {
    name: "qqq2222q1",
    typeRouteId: "1",
    about: "aaa3333a1",
    color: "green",
    icon: "fds",
    geometry: { type: "Point", coordinates: [37.6171875, 55.7642131648377] },
  };

  api
    .newRoutes(routes)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});

  nameOf.value = "";
  idOf.value = "";
  aboutOf.value = "";

  let li = document.createElement("li");
  li.setAttribute("class", "list__element");

  parent.appendChild(li);
}

submit.addEventListener("click", change);
// add.addEventListener("click", create);
