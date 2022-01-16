let map = document.querySelector(".map");

let menu = map.querySelector(".menu");
let button = map.querySelector(".map__button");
let menuButtons = map.querySelectorAll(".menu__button");
let buttonBack = map.querySelectorAll(".map__button_back");
let buttonImg = map.querySelectorAll(".button__img");
let buttonText = map.querySelectorAll(".button__text");
const nameArray = ["Любимые места", "Трекер", "Маршруты"];

let fp = document.getElementById("favouritePl");
let list = document.querySelectorAll(".list");

let listOfButtons = map.querySelectorAll(".list__button");
//let listImg = map.querySelector(".list__img");
let routes = document.getElementById("routes");

function buttonClick() {
  menu.classList.toggle(".menu_open");

  menuButtons.forEach((item, i) => {
    item.children[0].classList.toggle("button__text_open");
    item.children[1].classList.toggle("button__img_open");
  });

  button.classList.toggle("map__button_back");

  list[0].classList.remove("list__open");
  list[1].classList.remove("list__open");
}

function menuOpen() {
  menu.classList.add("menu_open");

  menuButtons.forEach((item, i) => {
    item.innerText = nameArray[i];
  });
  buttonImg.classList.add("button__img_open");
  button.classList.add("map__button_back");
}

function menuClose() {
  menu.classList.remove("menu_open");
  menuButtons.forEach((item, i) => {
    item.innerText = "";
  });
  buttonImg.classList.remove("button__img_open");
  button.classList.remove("map__button_back");
}

button.addEventListener("click", buttonClick);

fp.addEventListener("click", VisibilityF);
routes.addEventListener("click", VisibilityR);

function VisibilityF() {
  list[0].classList.toggle("list__open");
}

function VisibilityR() {
  list[1].classList.toggle("list__open");
}

function itemClick() {
  listOfButtons.forEach((item, i) => {
    item.children[i].classList.toggle("list__button_open");
  });
  //listImg.classList.add("list__img_open");
}

listOfButtons.forEach((item, i) => {
  item.addEventListener("click", itemClick);
});
