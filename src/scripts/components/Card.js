export class Card {
  //Объявление всех приватных переменных
  #name;
  #link;
  #newCard;
  #templateSelector;
  #handleClickImage;
  #handleClickDelete;
  #handleClickLike;
  #cardLike;
  #likes;
  #myId;
  #ownerId;
  #userId;
  #cardDelete;
  #openDeletePopup
  //Приватный метод класса для нахождения темплейта в документе проекта
  #getTemplate() {
    return document
      .querySelector(this.#templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }
  //Конструктор класса/присваивание значений переменным, которые нужны для создания объекта класса
  constructor({data, userId, handleClickImage, handleClickDelete, handleClickLike}, templateSelector) {
    this.#name = data.name;
    this.#link = data.link;
    this.#likes = data.likes;
    this.#myId = data.myId;
    this.#ownerId = data.owner._id;
    this.#userId = userId
    this.#templateSelector = templateSelector;
    this.#handleClickImage = handleClickImage;
    this.#openDeletePopup = handleClickDelete;
    this.#handleClickLike = handleClickLike;
  }
  //Общедоступный метод класса, создающий карточку на странице
  createCard = () => {
      this.#newCard = this.#getTemplate();
      const cardImage = this.#newCard.querySelector('.elements__image');
      this.#cardDelete = this.#newCard.querySelector(".elements__delete-button");
      const cardName = this.#newCard.querySelector(".elements__name");
      this.#cardLike = this.#newCard.querySelector(".elements__like-button");
                              
      cardImage.src = this.#link;
      cardImage.alt = this.#name;
      cardName.textContent = this.#name;
      //Удаления объекта                
      this.#cardDelete.addEventListener("click", () => {
        this.#openDeletePopup(this.#newCard);
      });
      //Лайк объекта                   
      this.#cardLike.addEventListener("click", () => {;
        this.#handleClickLike(this.#cardLike)
      });
      //Открытие модального окна с изображением карточки                   
      cardImage.addEventListener("click", () => {
        this.#handleClickImage(this.#name, this.#link)
      });
      //Возвращение объекта в общую видимость
      this.#changeVisibleTrashButton()
      return this.#newCard;
    }

  removeCard() {
    this.#newCard.remove();
    this.#newCard = null
  }

  #changeVisibleTrashButton(){
    this.#myId === this.#ownerId ? this.#cardDelete.style.display = "block" : this.#cardDelete.style.display = "none"
  }
}