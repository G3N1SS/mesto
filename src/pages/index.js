//переменные и импорты
import './index.css'
import {profileEditButton} from "../scripts/utils/constants.js"
import {cardAddButton} from "../scripts/utils/constants.js"
import { avatarChangeButton } from '../scripts/utils/constants.js'
import {cardForm} from "../scripts/utils/constants.js"
import {profileForm} from "../scripts/utils/constants.js"
import { avatarForm } from '../scripts/utils/constants.js'
import {config} from "../scripts/utils/constants.js"
import {initialCards} from "../scripts/utils/constants.js"
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupImage } from "../scripts/components/PopupImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { Section } from "../scripts/components/Section.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from '../scripts/components/Api.js';
import { PopupDeleteCard } from '../scripts/components/PopupDeleteCard.js'
import { data } from 'autoprefixer'

const cardValidator = new FormValidator(cardForm, config);
cardValidator.enableValidation();
const avatarValidator = new FormValidator(avatarForm, config)
avatarValidator.enableValidation()
const profileValidator = new FormValidator(profileForm, config);
profileValidator.enableValidation();

const cardSectionInstance = new Section({renderer: (items) => {
  createCard(items)
}}, ".element");

const cardFormInstance = new PopupWithForm(".popup_type_opened-add",".popup__form_add", handleFormSubmitAdd);
const profileFormInstance = new PopupWithForm(".popup_type_opened-profile", ".popup__form_profile", handleFormSubmitProfile);
const avatarFormInstance = new PopupWithForm(".popup_type_opened-avatar", ".popup__form_avatar", handleFormSubmitAvatar)

const cardImageInstance = new PopupImage(".popup_type_opened-image", ".popup__image", ".popup__caption");

const userInfo = new UserInfo(".profile__name", ".profile__job", ".profile__avatar-image");

const deleteFormInstance = new PopupDeleteCard(".popup_type_opened-delete", handleFormSubmitDelete)

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '45573968-5048-42c7-ac90-3ae0a9a860f3',
    "Content-Type": "application/json"
  }
}

const api = new Api(configApi);

let userId = null;

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

function handleAvatarButtonClick() {
  avatarValidator.disableButton()
  avatarFormInstance.open()
}

function handleFormSubmitAvatar(data) {
  api.setNewAvatar(data)
  .then(res => {
    userInfo.setUserInfo({avatar: res.avatar, about: res.about, username: res.name})
  })
  .catch((err => console.error(`Ошибка при редактировании профиля ${err}`)))
  .finally(() => {
    avatarFormInstance.submitBtnTextChanger();
  })
  avatarFormInstance.close()
}

//Функция изменения данных профиля
function handleFormSubmitProfile(data) {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({avatar: res.avatar, about: res.about, username: res.name})
    })
    .catch((err => console.error(`Ошибка при редактировании профиля ${err}`)))
    .finally(() => {
      profileFormInstance.submitBtnTextChanger()
    })
  // userInfo.setUserInfo({name, job});
  profileFormInstance.close();
};
//Функция добавления карточки на страницу
function handleFormSubmitAdd(data) {
  api.addCard(data)
    .then((dataCard) => {
      dataCard.myId = userId;
      renderCard(dataCard);
      cardFormInstance.close();
    })
    .catch((err) => console.error(`Ошибка при создании карточки ${err}`))
    .finally(() => {
      cardFormInstance.submitBtnTextChanger()
    })
    cardFormInstance.close()
};

function handleFormSubmitDelete({card, cardId}){
  api.deleteCard(cardId)
    .then(res => {
      card.removeCard()
      deleteFormInstance.close()
    })
    .catch((err) => console.error(`Ошибка при удалении карточки ${err}`))
    .finally(() => {
      deleteFormInstance.deleteBtnTextChanger()
    })
  deleteFormInstance.close()
  } 

//Функция создании карточки с помощью класса карты
function createCard(data) {
  const card = new Card({data, userId, handleClickImage, handleClickDelete},(likeElement, cardId) => {
    if(likeElement.classList.contains("elements__like-button_active")){
      api.removeLike(cardId)
      .then(res => {
        card.toggleLike(res.likes)
      })
      .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    } else {
      api.putLike(cardId)
      .then(res => {
        card.toggleLike(res.likes)
      })
      .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    }
  },".element-template")
  cardSectionInstance.addItemPrepend(card.createCard())
}

//Функция добавления новой карточки на страницу
function renderCard(data) {
  createCard(data);
};

function handleClickDelete({card, cardId}) {
  deleteFormInstance.open({card, cardId})
}

//слушатели/обработчики
//Открытие модального окна с изменением данных профиля
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
//Открытие модального окна с добавлением карточки
cardAddButton.addEventListener("click", handleCardAddButtonClick);

avatarChangeButton.addEventListener("click",handleAvatarButtonClick)

cardFormInstance.setEventListener();
profileFormInstance.setEventListener(); 
cardImageInstance.setEventListener();
avatarFormInstance.setEventListener();
deleteFormInstance.setEventListener()

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    userId = dataUser._id
    dataCard.forEach(element => element.myId = userId)
    userInfo.setUserInfo({avatar: dataUser.avatar,username: dataUser.name, about: dataUser.about})
    cardSectionInstance.rendererItems(dataCard)
  })
  .catch((err) => console.error(`Ошибка при создании начальных данных страницы ${err}`))