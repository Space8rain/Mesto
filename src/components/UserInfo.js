export default class UserInfo {
  constructor({name, info}) {
  this._name = document.querySelector(name);
  this._info = document.querySelector(info);
  }

  // Возвращаем данные пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  // Новые данные пользователя
  setUserInfo({profilename, profileactivity}) {
    this._name.textContent = profilename;
    this._info.textContent = profileactivity
  }
}
