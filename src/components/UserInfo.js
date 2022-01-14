export default class UserInfo {
  constructor({name, info, avatar}) {
  this._name = document.querySelector(name);
  this._info = document.querySelector(info);
  this._avatar = document.querySelector(avatar)
  }

  // Возвращаем данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    }
  }

  // Новые данные пользователя
  setUserInfo({profileName, profileActivity, avatar}) {
    this._name.textContent = profileName;
    this._info.textContent = profileActivity;
    this._avatar.src = avatar
  }
}
