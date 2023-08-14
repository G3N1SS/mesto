export const popupProfile = document.querySelector(".popupProfile");
export const popupAdd = document.querySelector(".popupAdd");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const cardAddButton = document.querySelector(".profile__add-button");
export const formElementProfile = document.forms['popupProfile'];
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const placeInput = document.querySelector('.popup__input_type_place');
export const imageInput = document.querySelector('.popup__input_type_image');
export const popupImages = document.querySelector(".popupImages");
export const popupImage = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
export const popups = document.querySelectorAll('.popup');
export const cardForm = document.querySelector('.popup__form_add');
export const profileForm = document.querySelector('.popup__form_profile');
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_state_invalid',
  errorClass: '.error',
}
export const initialCards = [
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