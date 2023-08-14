//переменные и импорты
import './index.css'

import {popupProfile} from "../scripts/utils/constants.js"
import {popupAdd} from "../scripts/utils/constants.js"
import {profileEditButton} from "../scripts/utils/constants.js"
import {cardAddButton} from "../scripts/utils/constants.js"
import {formElementProfile} from "../scripts/utils/constants.js"
import {nameInput} from "../scripts/utils/constants.js"
import {jobInput} from "../scripts/utils/constants.js"
import {placeInput} from "../scripts/utils/constants.js"
import {imageInput} from "../scripts/utils/constants.js"
import {popupImages} from "../scripts/utils/constants.js"
import {popupImage} from "../scripts/utils/constants.js"
import {popupCaption} from "../scripts/utils/constants.js"
import {popups} from "../scripts/utils/constants.js"
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
import { Popup } from '../scripts/components/Popup'

const cardValidator = new FormValidator(cardForm, config);
cardValidator.enableValidation();
const profileValidator = new FormValidator(profileForm, config);
profileValidator.enableValidation();

const cardSectionInstance = new Section({items: initialCards, renderer: ({name, link}) => {
  const cardElement = createCard({name,link})
  cardSectionInstance.addItem(cardElement);
}}, ".element");

const cardFormInstance = new PopupWithForm(".popupAdd",".popup__form_add", handleFormSubmitAdd);

const profileFormInstance = new PopupWithForm(".popupProfile", ".popup__form_profile", handleFormSubmitProfile);

const cardImageInstance = new PopupImage(".popupImages", ".popup__image", ".popup__caption");

const userInfo = new UserInfo(".profile__name", ".profile__job");
//функции

//Функция закрытия всех модальных окон при нажатии на оверлей(общая функция)
cardFormInstance.setEventListener();
profileFormInstance.setEventListener();
//Функция открытия модального окна с профилем
function handleProfileEditButtonClick() {
  profileValidator.disableButton();
  const userInformation = userInfo.getUserInfo(nameInput,jobInput);
  nameInput.value = userInformation.userName;
  jobInput.value = userInformation.userJob;
  profileFormInstance.open()
};
//Функция открытия модального окна с изображением
function handleClickImage(name,link){
  cardImageInstance.open(name,link);
  cardImageInstance.setEventListener();
}
//Функция открытия модального окна с добавлением новой карточки
function handleCardAddButtonClick() {
  cardValidator.disableButton();
  cardFormInstance.open();
};

//Функция изменения данных профиля
function handleFormSubmitProfile() {
  userInfo.setUserInfo(nameInput, jobInput);
  profileFormInstance.close();
};
//Функция добавления карточки на страницу
function handleFormSubmitAdd() {
  const dataCard = {
    name: placeInput.value,
    link: imageInput.value
  }
  renderCard(dataCard);
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
//Отправка формы при изменения профиля

//Отправка формы при добавлении карточки


//вызов функций

cardSectionInstance.rendererItems(initialCards);