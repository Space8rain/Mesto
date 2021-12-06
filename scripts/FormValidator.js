export class FormValidator {
  constructor(obj, formElement) {
  this._formSelector = obj.formSelector;
  this._inputSelector = obj.inputSelector;
  this._submitButtonSelector = obj.submitButtonSelector;
  this._inactiveButtonClass = obj.inactiveButtonClass;
  this._inputErrorClass = obj.inputErrorClass;
  this._errorClass = obj.errorClass;
  this._formElement = formElement;
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  }

  // Ищем не валидный инпут
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Показываем\скрываем сообщения об ошибке
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Перевлючение состояния кнопки
  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      // сделать неактивной
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      // сделать активной
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  // Показать ошибку
  _showInputError = (inputElement) => {

  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this._errorClass);
};

  // Скрыть ошибку
  _hideInputError = (inputElement) => {

  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

  // Добавление слушателей
  _setEventListener = () => {

    this.toggleButtonState();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  // Валидация форм
  enableValidation = () => {
    this._setEventListener();
  };

  // Сбросить ошибки
  resetErrors = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
    this.toggleButtonState();
  }

}


