import { Popup } from "./Popup";

export class PopupDeleteCard extends Popup {
  #submitHandler;
  #form;
  #element;
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.#form = this.popup.querySelector(".popup__form")
    this.#submitHandler = submitHandler;
  }

  setEventListener() {
    super.setEventListener();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#submitHandler(this.#element)
    })
  }

  open = (element) => {
    super.open();
    console.log(element)
    this.#element = element;
  }

}