//переменные и импорты
import './index.css'
import {profileEditButton} from "../scripts/utils/constants.js"
import {cardAddButton} from "../scripts/utils/constants.js"
// import {nameInput} from "../scripts/utils/constants.js"
// import {jobInput} from "../scripts/utils/constants.js"
import {cardForm} from "../scripts/utils/constants.js"
import {profileForm} from "../scripts/utils/constants.js"
import {config} from "../scripts/utils/constants.js"
import {initialCards} from "../scripts/utils/constants.js"
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupImage } from "../scripts/components/PopupImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";

const cardValidator = new FormValidator(cardForm, config);
cardValidator.enableValidation();
const profileValidator = new FormValidator(profileForm, config);
profileValidator.enableValidation();

const cardSectionInstance = new Section({items: initialCards, renderer: ({name, link}) => {
  const cardElement = createCard({name,link})
  cardSectionInstance.addItem(cardElement);
}}, ".element");

const cardFormInstance = new PopupWithForm(".popup_type_opened-add",".popup__form_add", handleFormSubmitAdd);

const profileFormInstance = new PopupWithForm(".popup_type_opened-profile", ".popup__form_profile", handleFormSubmitProfile);

const cardImageInstance = new PopupImage(".popup_type_opened-image", ".popup__image", ".popup__caption");

const userInfo = new UserInfo(".profile__name", ".profile__job");
//функции

//Функция открытия модального окна с профилем
function handleProfileEditButtonClick() {
  profileValidator.disableButton();
  profileFormInstance.setInputsValue(userInfo.getUserInfo());
  profileFormInstance.open()
}; 
//Функция открытия модального окна с изображением
function handleClickImage(name,link){
  cardImageInstance.open(name,link);
}
//Функция открытия модального окна с добавлением новой карточки
function handleCardAddButtonClick() {
  cardValidator.disableButton();
  cardFormInstance.open();
};

//Функция изменения данных профиля
function handleFormSubmitProfile({name, job}) {
  userInfo.setUserInfo(name, job);
  profileFormInstance.close();
};
//Функция добавления карточки на страницу
function handleFormSubmitAdd(inputValues) {
  renderCard({name: inputValues.inputPlace, link: inputValues.inputImage});
  cardFormInstance.close();
};
//Функция создании карточки с помощью класса карты
function createCard({name, link}) {
  const card = new Card({name, link, handleClickImage}, ".element-template").createCard()
  return card;
}

//Функция добавления новой карточки на страницу
function renderCard({name, link}) {
  cardSectionInstance.addItem(createCard({name, link}));
};

//слушатели/обработчики
//Открытие модального окна с изменением данных профиля
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
//Открытие модального окна с добавлением карточки
cardAddButton.addEventListener("click", handleCardAddButtonClick);


cardSectionInstance.rendererItems(initialCards);
cardFormInstance.setEventListener();
profileFormInstance.setEventListener(); 
cardImageInstance.setEventListener();