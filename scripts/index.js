//переменные и импорты
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";
import { PopupImage } from "./PopupImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { Section } from "./Section.js";
import { UserInfo } from "./UserInfo.js";
const popupProfile = document.querySelector(".popupProfile");
const popupAdd = document.querySelector(".popupAdd");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const firstName = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");
const formElementProfile = document.forms['popupProfile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_place');
const imageInput = document.querySelector('.popup__input_type_image');
const popupImages = document.querySelector(".popupImages");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll('.popup');
const cardForm = document.querySelector('.popup__form_add');
const profileForm = document.querySelector('.popup__form_profile');
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: '.error',
}
const cardValidator = new FormValidator(cardForm, config);
cardValidator.enableValidation();
const profileValidator = new FormValidator(profileForm, config);
profileValidator.enableValidation();
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardSectionInstance = new Section({items: initialCards, renderer: ({name, link}) => {
  const cardElement = createCard({name,link})
  cardSectionInstance.addItem(cardElement);
}}, ".element");

const popupInstance = new Popup(".popup");

const cardFormInstance = new PopupWithForm(".popupAdd",".popup__form_add", handleFormSubmitAdd);

const profileFormInstance = new PopupWithForm(".popupProfile", ".popup__form_profile", handleFormSubmitProfile);

const cardImageInstance = new PopupImage(".popup__image");

const userInfo = new UserInfo(".profile__name", ".profile__job");
//функции

//Функция закрытия всех модальных окон при нажатии на оверлей(общая функция)
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})
//Функция открытия модального окна с профилем
function handleProfileEditButtonClick() {
  userInfo.getUserInfo(nameInput,jobInput)
  profileFormInstance.open()
};
//Функция открытия модального окна с изображением
function handleClickImage(name,link){
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImages);
}
//Функция открытия модального окна с добавлением новой карточки
function handleCardAddButtonClick() {
  cardFormInstance.open();
};
//Функция открытия всех модальных окон(общая функция)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
};
//Функция закрытия всех модальных окон(общая функция)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};
//Функция изменения данных профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(nameInput, jobInput);
  closePopup(popupProfile);
};
//Функция добавления карточки на страницу
function handleFormSubmitAdd(evt) {
  const dataCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  renderCard(dataCard);
  closePopup(popupAdd);
  evt.target.reset();
};
//Функция создании карточки с помощью класса карты
function createCard({name, link}) {
  const card = new Card({name, link, handleClickImage}, ".element-template").createCard()
  return card;
}
//Фунция вывода карточки на страницу

//Функция добавления новой карточки на страницу
function renderCard({name, link}) {
  cardSectionInstance.addItem(createCard({name, link}));
};
//Фунция закрытия модальных окон при нажатии на клавишу Escape(общая функция)
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//слушатели/обработчики

//Открытие модального окна с изменением данных профиля
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
//Открытие модального окна с добавлением карточки
cardAddButton.addEventListener("click", handleCardAddButtonClick);
//Отправка формы при изменения профиля
formElementProfile.addEventListener('submit', handleFormSubmitProfile);
//Отправка формы при добавлении карточки


//вызов функций

cardSectionInstance.rendererItems(initialCards);
cardFormInstance.setEventListener();
cardImageInstance.open(); 