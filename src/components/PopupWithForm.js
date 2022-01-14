import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitBtn = this._popup.querySelector('.popup__btn-save');
    this._submitForm = submitForm;
  }

  // Сбор данных полей форм
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value))
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  // Меняем текст у кнопки сабмита на время загрузки
  showLoading(isLoad) {
    if (isLoad) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = 'Сохранить'
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
