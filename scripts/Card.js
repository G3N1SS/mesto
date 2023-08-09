export class Card {
  //Объявление всех приватных переменных
  #name;
  #link;
  #newCard;
  #templateSelector;
  #handleClickImage;
  #cardLike;
  //Приватный метод класса для нахождения темплейта в документе проекта
  #getTemplate() {
    return document
      .querySelector(this.#templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }
  //Конструктор класса/присваивание значений переменным, которые нужны для создания объекта класса
  constructor({name, link, handleClickImage}, templateSelector) {
    this.#name = name;
    this.#link = link;
    this.#templateSelector = templateSelector;
    this.#handleClickImage = handleClickImage;
    this.#cardLike = null;
  }
  //Общедоступный метод класса, создающий карточку на странице
  createCard = () => {
      this.#newCard = this.#getTemplate();
      const cardImage = this.#newCard.querySelector('.elements__image');
      const cardDelete = this.#newCard.querySelector(".elements__delete-button");
      const cardName = this.#newCard.querySelector(".elements__name");
      this.#cardLike = this.#newCard.querySelector(".elements__like-button");
                              
      cardImage.src = this.#link;
      cardImage.alt = this.#name;
      cardName.textContent = this.#name;
      //Удаления объекта                
      cardDelete.addEventListener("click", () => {
        this.#handleClickDelete();
      });
      //Лайк объекта                   
      this.#cardLike.addEventListener("click", () => {;
        this.#handleClickLike()
      });
      //Открытие модального окна с изображением карточки                   
      cardImage.addEventListener("click", () => {
        this.#handleClickImage(this.#name, this.#link)
      });
      //Возвращение объекта в общую видимость
      return this.#newCard;
    }
  //Метод удаления объекта
  #handleClickDelete = () => {
      this.#newCard.remove();
  }
  //Метод лайка объекта
  #handleClickLike = () => {
      this.#cardLike.classList.toggle("elements__like-button_active");
  }
}