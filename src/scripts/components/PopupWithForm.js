import { Popup  } from "./Popup.js";
export class PopupWithForm extends Popup {
  #formElement;
  #submitHandler;
  #formValues;
  #inputList;
  #submitBtn;
  #defaultSubmitBtnText;
  constructor(popupSelector, formSelector, submitHandler){
    super(popupSelector);
    this.#formElement = document.querySelector(formSelector);
    this.#submitHandler = submitHandler;
    this.#submitBtn = this.#formElement.querySelector(".popup__save");
    this.#defaultSubmitBtnText = this.#submitBtn.textContnent;
    this.#inputList = Array.from(
      this.#formElement.querySelectorAll(".popup__input")
    )
  }
  
  #getInputValues() {
    this.#formValues = {};
    this.#inputList.forEach(input => {
        this.#formValues[input.name] = input.value;
    });
    return this.#formValues;
  }

  setInputsValue(element) {
    this.#inputList.forEach(input => {
      input.value = element[input.name];
    })
  }

  setEventListener() {
    super.setEventListener()
    this.#formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#defaultSubmitBtnText = `${this.#submitBtn.textContnent}...`
      this.#submitHandler(this.#getInputValues());
    })
}

submitBtnTextChanger(){
  this.#submitBtn = this.#defaultSubmitBtnText;
}

  close(){
    super.close();
    this.#formElement.reset();
  }
}