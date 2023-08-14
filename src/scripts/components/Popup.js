export class Popup {

  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  #handleEscUp = (e) => {
    if (e.key === "Escape") {
        this.close();
    }
  }

  overlayClick = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ){
      this.close();
    }  
  }


  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this.#handleEscUp);
  }
  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this.#handleEscUp);
  }

setEventListener() {
  this.popup.addEventListener("mousedown", this.overlayClick);
  }
}
