import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupForm = this._popupSelector.querySelector('.form');
    this.submitForm = submitForm;
  }

  // Сбор данных полей форм
  _getInputValues() {
    this._formValues = {};
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));

    this._inputList.forEach((input) => (this._formValues[input.name] = input.value))
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
      this.close();
    });

  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
