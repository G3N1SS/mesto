export class UserInfo {
  #name;
  #about;
  constructor(name, about){
    this.#name = document.querySelector(name);
    this.#about = document.querySelector(about);
  }
  getUserInfo(nameInput, aboutInput){
    nameInput.value = this.#name.textContent;
    aboutInput.value = this.#about.textContent;
  }
  setUserInfo(nameInput, aboutInput){
    this.#name.textContent = nameInput.value;
    this.#about.textContent = aboutInput.value;
  }
}