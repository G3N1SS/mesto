export class UserInfo {
  #name;
  #about;
  #userData;
  #profileAvatar
  constructor(name, about, avatar){
    this.#name = document.querySelector(name);
    this.#about = document.querySelector(about);
    this.#profileAvatar = document.querySelector(avatar);
  }
  getUserInfo() {
    this.#userData = {
        name: this.#name.textContent,
        job: this.#about.textContent,
    }
    return this.#userData;
}

  setUserInfo({avatar,username,about}){
    this.#profileAvatar.src = avatar;
    this.#name.textContent = username;
    this.#about.textContent = about;
  }
}