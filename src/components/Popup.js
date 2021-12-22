export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Открыть попап
  open() {
    this._popup.addEventListener('click', this._handleOverlayClose)
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_is-opened');
  }

  // Закрыть попап
  close() {
    this._popup.classList.remove('popup_is-opened');
    this._popup.removeEventListener('click', this._handleOverlayClose)
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Закрыть попап при нажатии esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  // Закрыть попап при нажатии на иконку "закрыть" или вне области попапа
  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      this.close()
    }
  }


  setEventListeners() {
    const popupCloseButton = this._popup.querySelector('.popup__btn-close')
    popupCloseButton.addEventListener('click', () => {
      this.close()
    })
  }

}
