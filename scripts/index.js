// //import Api from "./api.js";

// const api = new Api({
//   baseUrl: "https:/127.0.0.1:5001/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Promise.all([api.getUser(), api.getInitialCards()])
//   .then((data) => {
//     gUser.setUserInfo(data[0]);

//     gSection = new Section(
//       {
//         data: data[1],
//         renderer: (item) =>
//           addCard(api, gSection, item, gUser.id, true, gError),
//       },

//       ".elements__list"
//     );

//     gSection.renderItems();
//   })
//   .catch((err) => {
//     gError.open(err);
//   });

// gForms.forEach((form) => {
//   new Validator(gConfigValidator, form).enableValidation();
// });

// const gPopupImage = new PopupWithImage(".popup_type-form_picture");
// const gPopupAdd = new PopupWithForm(
//   ".popup_type-form_add",
//   "Создание...",
//   submitFormAdd
// );
// const gPopupEdit = new PopupWithForm(
//   ".popup_type-form_edit",
//   "Сохранение...",
//   submitFormEdit
// );
// const gPopupAvatar = new PopupWithForm(
//   ".popup_type-form_avatar",
//   "Сохранение...",
//   submitFormAvatar
// );
// const gPopupConfirm = new PopupWithButton(
//   ".popup_type-form_confirm",
//   "Удаление...",
//   submitFormConfirm
// );

// function loadFormEdit() {
//   const user = gUser.getUserInfo();
//   gPopupEdit.setInputValues(user);
//   gPopupEdit.open();
// }

// function loadFormAdd() {
//   gPopupAdd.open();
// }

// function loadFormPicture(alt, src) {
//   gPopupImage.open(alt, src);
// }

// function loadFormConfirm(elementCard, cardId) {
//   gPopupConfirm.open(elementCard, cardId);
// }

// function loadFormAvatar() {
//   const user = gUser.getUserAvatar();
//   gPopupAvatar.setInputValues(user);
//   gPopupAvatar.open();
// }

// function submitFormAdd(cardData) {
//   api
//     .newCard(cardData.place, cardData.url)
//     .then((data) => {
//       addCard(api, gSection, data, gUser.id, false, gError);
//       gPopupAdd.close();
//     })
//     .catch((err) => {
//       gError.open(err);
//     })
//     .finally(() => {
//       gPopupAdd.recovery("Создать");
//     });
// }

// function submitFormEdit(user) {
//   api
//     .setUser(user.name, user.descr)
//     .then((data) => {
//       gUser.setUserInfo(data);
//       gPopupEdit.close();
//     })
//     .catch((err) => {
//       gError.open(err);
//     })
//     .finally(() => {
//       gPopupEdit.recovery("Сохранить");
//     });
// }

// function submitFormAvatar(user) {
//   api
//     .setAvatar(user.avatar)
//     .then((data) => {
//       gUser.setUserAvatar(data);
//       gPopupAvatar.close();
//     })
//     .catch((err) => {
//       gError.open(err);
//     })
//     .finally(() => {
//       gPopupAvatar.recovery("Сохранить");
//     });
// }

// function submitFormConfirm(elementCard, cardId) {
//   api
//     .deleteCard(cardId)
//     .then(() => {
//       elementCard.deleteCard();
//       gPopupConfirm.close();
//     })
//     .catch((err) => {
//       gError.open(err);
//     })
//     .finally(() => {
//       gPopupConfirm.recovery("Да");
//     });
// }

// const buttonEdit = document.querySelector(".profile__button-edit");
// buttonEdit.addEventListener("click", loadFormEdit);

// const buttonAdd = document.querySelector(".profile__button-add");
// buttonAdd.addEventListener("click", loadFormAdd);

// const buttonAvatar = document.querySelector(".profile__button-avatar");
// buttonAvatar.addEventListener("click", loadFormAvatar);
