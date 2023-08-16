export class UserInfo {
  #name;
  #about;
  #userData;
  constructor(name, about){
    this.#name = document.querySelector(name);
    this.#about = document.querySelector(about);
  }
  getUserInfo() {
    this.#userData = {
        name: this.#name.textContent,
        job: this.#about.textContent,
    }
    return this.#userData;
}

  setUserInfo(nameInputValue,aboutInputValue){
    this.#name.textContent = nameInputValue;
    this.#about.textContent = aboutInputValue;
  }
}