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
let aboutOf = document.getElementById("3");
let colorOf = document.getElementById("4");

let submit = document.querySelector(".admin__submit");

function reload() {
  api
    .listTypeRoutes()
    .then((data) => {
      const typeRouteslist = data;

      typeRouteslist.forEach((element) => {
        let li = document.createElement("li");
        li.setAttribute("class", "admin__list-element");
        li.setAttribute("data-id", element.id);
        li.setAttribute("data-name", element.name);
        li.setAttribute("data-about", element.about);
        li.setAttribute("data-color", element.color);

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
}

function clickListElement(e) {
  if (e.target.localName == "button") {
    api
      .deleteTypeRoutes(e.currentTarget.dataset.id)
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
    aboutOf.value = e.currentTarget.dataset.about;
    colorOf.value = e.currentTarget.dataset.color;
  }
}

function save(e) {
  let routes = {};

  routes.id = idOf.value;
  routes.name = nameOf.value;
  routes.about = aboutOf.value;
  routes.color = colorOf.value;

  if (idOf.value == "") {
    routes.id = 0;
    api
      .newTypeRoutes(routes)
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
      .editTypeRoutes(routes)
      .then((data) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        nameOf.value = "";
        idOf.value = "";
        aboutOf.value = "";
        colorOf.value = "";
      });
  }
}

reload();
submit.addEventListener("click", save);
