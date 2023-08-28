import { Popup } from "./Popup";

export class PopupDeleteCard extends Popup {
  #submitHandler;
  #form;
  #element;
  #cardId;
  #deleteBtn;
  #deleteBtnText;
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.#form = this.popup.querySelector(".popup__form");
    this.#deleteBtn = this.popup.querySelector(".popup__save");
    this.#deleteBtnText = this.#deleteBtn.textContnent;
    this.#submitHandler = submitHandler;
  }

  setEventListener() {
    super.setEventListener();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // this.#deleteBtn.textContnent = `${this.#deleteBtn.textContnent}...`
      this.#submitHandler({card: this.#element, cardId: this.#cardId})
    })
  }

  deleteBtnTextChanger(){
    this.#deleteBtn = this.#deleteBtnText;
  }

  open = ({card, cardId}) => {
    super.open();
    this.#element = card;
    this.#cardId = cardId
  }
}