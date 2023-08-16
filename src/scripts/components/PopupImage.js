import { Popup } from "./Popup.js";

export class PopupImage extends Popup {
  #popupImage;
  #popupCaption
  constructor(popupSelector,imageSelector,captionSelector) {
    super(popupSelector);
    this.#popupImage = document.querySelector(imageSelector);
    this.#popupCaption = document.querySelector(captionSelector);
  }

  open(name,link) {
    this.#popupImage.src = link;
    this.#popupImage.alt = name;
    this.#popupCaption.textContent = name;
    
    super.open();
  }
  close(){
    this.#popupImage.src = "";
    this.#popupImage.alt = "";
    this.#popupCaption.textContent = "";
    super.close()
  }
}