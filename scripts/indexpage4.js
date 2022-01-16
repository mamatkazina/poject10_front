import Api from "./api.js";

const api = new Api({
  baseUrl: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let elements = document.querySelectorAll(".list__element");
let buttons = document.querySelectorAll(".list__button");
let text, id, about;
let nameOf = document.getElementById("1");
let idOf = document.getElementById("2");
let aboutOf = document.getElementById("3");
let submit = document.querySelector(".form__button");
let add = document.querySelector(".alone");
let parent = document.querySelector(".list");

for (let item of elements) {
  item.insertAdjacentHTML(
    "beforeEnd",
    '<button class="list__button-img"></button>'
  );

  item.lastChild.onclick = function () {
    item.remove();
  };
}

for (let i of buttons) {
  i.onclick = function () {
    // text = i.getAttribute("aria-label");
    // id = i.getAttribute("id");
    // about = i.getAttribute("about");
    // nameOf.value = text;
    // idOf.value = id;
    // aboutOf.value = about;

    nameOf.value = i.dataset.name;
    idOf.value = i.dataset.id;
    aboutOf.value = i.dataset.about;
  };
}

function change(e) {
  for (let i of buttons) {
    if (idOf.value == i.dataset.id) {
      buttons[0].innerHTML = nameOf.value;
    } else {
      let li = document.createElement("li");
      li.setAttribute("class", "list__element");

      parent.appendChild(li);
    }
  }

  // и тут в  будущем заменить остальные через апи
}

function create() {
  nameOf.value = "";
  idOf.value = "";
  aboutOf.value = "";
}

submit.addEventListener("click", change);
add.addEventListener("click", create);
