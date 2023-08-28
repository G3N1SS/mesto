export class Card {
  //Объявление всех приватных переменных
  #name;
  #link;
  #templateSelector;
  #handleClickImage;
  #handleClickDelete;
  #handleClickLike;
  #cardLike;
  #likes;
  #myId;
  #ownerId;
  #userId;
  #openDeletePopup;
  #cardName;
  #cardDelete;
  #cardImage;
  #newCard
  #likesLength;
  #likeCounter;
  #cardId
  //Конструктор класса/присваивание значений переменным, которые нужны для создания объекта класса
  constructor({data, userId, handleClickImage, handleClickDelete}, handleClickLike, templateSelector) {
    // console.log(data)
    this.#name = data.name;
    this.#link = data.link;
    this.#likes = data.likes;
    this.#cardId = data._id;
    this.#likesLength = data.likes.length
    this.#myId = data.myId;
    this.#ownerId = data.owner._id;
    this.#userId = userId;
    this.#templateSelector = templateSelector;
    this.#handleClickImage = handleClickImage;
    this.#openDeletePopup = handleClickDelete;
    this.#handleClickLike = handleClickLike;
    this.#newCard = document
    .querySelector(this.#templateSelector)
    .content.querySelector(".elements__card")
    .cloneNode(true);;
    this.#cardImage = this.#newCard.querySelector('.elements__image');
    this.#cardDelete = this.#newCard.querySelector(".elements__delete-button");
    this.#cardName = this.#newCard.querySelector(".elements__name");
    this.#cardLike = this.#newCard.querySelector(".elements__like-button");
    this.#likeCounter = this.#newCard.querySelector(".elements__like-count")
  }
  //Общедоступный метод класса, создающий карточку на странице
  createCard = () => {
      this.#cardImage.src = this.#link;
      this.#cardImage.alt = this.#name;
      this.#cardName.textContent = this.#name;
      //Удаления объекта                
      this.#cardDelete.addEventListener("click", () => {
        this.#openDeletePopup({card: this, cardId: this.#cardId});
      });
      //Лайк объекта                   
      this.#cardLike.addEventListener("click", () => {;
        this.#handleClickLike(this.#cardLike, this.#cardId)
      });
      //Открытие модального окна с изображением карточки                   
      this.#cardImage.addEventListener("click", () => {
        this.#handleClickImage(this.#name, this.#link)
      });
      //Возвращение объекта в общую видимость
      this.#checkLikeStatus()
      this.#changeVisibleTrashButton()
      return this.#newCard;
    }

  toggleLike(likes) {
    this.#cardLike.classList.toggle('elements__like-button_active');
    this.#likeCounter.textContent = likes.length;
  }

  removeCard() {
    this.#newCard.remove();
    this.#newCard = null
  }

  #changeVisibleTrashButton(){
    this.#myId === this.#ownerId ? this.#cardDelete.style.display = "block" : this.#cardDelete.style.display = "none"
  }

  #checkLikeStatus() {
    this.#likes.forEach(element => {
      if (element._id === this.#myId){
        this.#cardLike.classList.add('elements__like-button_active')
        return
      }
    })
    this.#likeCounter.textContent = this.#likesLength

  }
}