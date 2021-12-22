import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector('.popup__photo')
    this._name = this._popup.querySelector('.popup__caption')
  }

  // Полиморфируем метод открытия попапа для картинки
  open(data) {

    this._link.src = data.link;
    this._link.alt = data.name;
    this._name.textContent = data.name;

    super.open();
  }
}
