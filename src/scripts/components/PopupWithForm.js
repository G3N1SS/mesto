import { Popup  } from "./Popup.js";
export class PopupWithForm extends Popup {
  #formElement;
  #submitHandler;
  #formValues;
  #inputList;
  constructor(popupSelector, formSelector, submitHandler = null){
    super(popupSelector);
    this.#formElement = document.querySelector(formSelector);
    this.#submitHandler = submitHandler;
    this.#inputList = Array.from(
      this.#formElement.querySelectorAll(".popup__input")
    )
  }


  
  #getInputValues() {
    const formValues = {};
    this.#inputList.forEach(input => {
        formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListener() {
    super.setEventListener()
    this.#formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#submitHandler(this.#getInputValues());
      this.close()
    })
}

  close(){
    super.close();
    this.#formElement.reset();
  }
}