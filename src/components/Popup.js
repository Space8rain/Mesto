export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  // Открыть попап
  open() {
    this._popupSelector.addEventListener('click', this._handleClickClose)
    document.addEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.add('popup_is-opened');
  }

  // Закрыть попап
  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    this._popupSelector.removeEventListener('click', this._handleClickClose)
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрыть попап при нажатии esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  // Закрыть попап при нажатии на иконку "закрыть" или вне области попапа
  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__btn-close')) {
      this.close()
    }
  }

}
