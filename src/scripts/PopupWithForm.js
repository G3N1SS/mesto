import { Popup  } from "./Popup.js";
export class PopupWithForm extends Popup {
  #formElement;
  #submitHandler;
  constructor(popupSelector, formSelector, submitHandler = null){
    super(popupSelector);
    this.#formElement = document.querySelector(formSelector);
    this.#submitHandler = submitHandler;
  }

  open(){
    super.open()
  }
  
  setEventListener() {
    this.#formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#submitHandler(e);
    });
  }
}