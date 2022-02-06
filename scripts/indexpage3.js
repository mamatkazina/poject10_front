import Api from "./api.js";

const api = new Api({
  baseUrl: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let list = document.querySelector(".admin__list");

let nameOf = document.getElementById("1");
let idOf = document.getElementById("2");
let typeOfId = document.getElementById("3");
let aboutOf = document.getElementById("4");
let colorOf = document.getElementById("5");
let pointsOf = document.getElementById("6");
let iconOf = document.getElementById("7");
let typeId;
let submit = document.querySelector(".admin__submit");
let select = document.querySelector(".admin__select");

function reload() {
  api
    .listRoutes()
    .then((data) => {
      const listRoutes = data;

      listRoutes.forEach((element) => {
        let li = document.createElement("li");
        li.setAttribute("class", "admin__list-element");
        li.setAttribute("data-id", element.id);
        li.setAttribute("data-typeRouteId", element.typeroutes_id);
        li.setAttribute("data-name", element.name);
        li.setAttribute("data-about", element.about);
        li.setAttribute("data-color", element.color);
        li.setAttribute("data-geom", element.geom);
        li.setAttribute("data-icon", element.icon);

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

  api
    .listTypeRoutes()
    .then((data) => {
      const typeRouteslist = data;

      typeRouteslist.forEach((element) => {
        let option = document.createElement("option");
        option.setAttribute("class", "admin__select_option");
        option.text = element.name;
        option.value = element.id;

        select.appendChild(option);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}

select.addEventListener("change", function () {
  typeId = parseInt(select.value);
});

function clickListElement(e) {
  if (e.target.localName == "button") {
    api
      .deleteRoutes(e.currentTarget.dataset.id)
      .then((data) => {
        // e.currentTarget.remove();
        //reload();
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  } else {
    nameOf.value = e.currentTarget.dataset.name;
    idOf.value = e.currentTarget.dataset.id;
    //typeOfId.value = e.currentTarget.dataset.typeRouteId;
    aboutOf.value = e.currentTarget.dataset.about;
    colorOf.value = e.currentTarget.dataset.color;
    pointsOf.value = e.currentTarget.dataset.geom;
    iconOf.value = e.currentTarget.dataset.icon;
  }
}

function save(e) {
  let routes = {};

  routes.id = idOf.value;
  routes.name = nameOf.value;
  //routes.typeroutes_id = parseInt(typeOfId.value);
  routes.typeroutes_id = typeId;
  routes.about = aboutOf.value;
  routes.color = colorOf.value;
  routes.icon = iconOf.value;
  routes.geometry = pointsOf.value;

  if (idOf.value == "") {
    routes.id = 0;
    api
      .newRoutes(routes)
      .then((data) => {
        //reload();
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  } else {
    api
      .editRoutes(routes)
      .then((data) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        nameOf.value = "";
        idOf.value = "";
        //typeOfId.value = "";
        aboutOf.value = "";
        colorOf.value = "";
        pointsOf.value = "";
        iconOf.value = "";
      });
  }
}

reload();
submit.addEventListener("click", save);
