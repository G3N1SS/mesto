export class FormValidator {
  //Объявление всех приватных переменных
  #formElement;
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #inputElement = null;
  //Конструктор класса/присваивание значений переменным, которые нужны для создания объекта класса
  constructor(formElement, config) {
    this.#formElement = formElement;
    this.#inputSelector = config.inputSelector;
    this.#submitButtonSelector = config.submitButtonSelector;
    this.#inactiveButtonClass = config.inactiveButtonClass;
    this.#inputErrorClass = config.inputErrorClass;
    this.activeButton = this.#formElement.querySelector(this.#submitButtonSelector);
    this.inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
  };
  //Приватный метод, показывающий ошибку валидации формы
  #showErrorMessage() {
    this.#inputElement.classList.add(this.#inputErrorClass);
    const errorElement = this.#formElement.querySelector(`#${this.#inputElement.name}-error`);
    errorElement.textContent = this.#inputElement.validationMessage;
  };
  //Приватный метод, скрывающий ошибку валидации формы
  #hideErrorMessage() {
    this.#inputElement.classList.remove(this.#inputErrorClass);
    const errorElement = this.#formElement.querySelector(`#${this.#inputElement.name}-error`);
    errorElement.textContent = this.#inputElement.validationMessage;
  };
  //Приватный метод, проверяющий валидность формы
  #checkInputValidity() {
      if (!this.#inputElement.checkValidity()) {
        this.#showErrorMessage();
      } else {
        this.#hideErrorMessage();
      };
  };
  //Приватный метод, отключающий кнопку 
  disableButton() {
    this.activeButton.disabled = true;
    this.activeButton.classList.add(this.#inactiveButtonClass);
  };
  //Приватный метод, активирующий кнопку
  #enableButton() {
    this.activeButton.disabled = false;
    this.activeButton.classList.remove(this.#inactiveButtonClass);
  };
  //Приватный метод, меняющий состояние кнопки в зависимости валидна ли форма или нет
  #toggleButtonState(isFormActive) {
    if (!isFormActive) {
      this.disableButton();
    } else {
      this.#enableButton();
    }
  }
  //Приватный метод, вешающий обратчики событий на те или иные элементы(инпуты, кнопки)
  #setEventListeners() {
    this.#toggleButtonState(this.#formElement.checkValidity());

    this.inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this.#inputElement = item;
        this.#toggleButtonState(this.#formElement.checkValidity());
        this.#checkInputValidity();
      });
    });
  };
  //Общий метод, который валидируют формы
  enableValidation() {
    this.#setEventListeners();
  };
}