import {forms} from './Utils.js';

export class FormValidator {
  constructor(obj, formElement) {
  this._formSelector = obj.formSelector;
  this._inputSelector = obj.inputSelector
  this._submitButtonSelector = obj.submitButtonSelector
  this._inactiveButtonClass = obj.inactiveButtonClass
  this._inputErrorClass = obj.inputErrorClass
  this._errorClass = obj.errorClass
  this._formElement = formElement;


  }

  // Получаем не валидный инпут
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Показываем\скрываем сообщения об ошибке
  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  //Перевлючение состояния кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add('popup__btn_disable');
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('popup__btn_disable');
    }
  };

  //Показать ошибку
  _showInputError = (formElement, inputElement, errorMessage) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(forms.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(forms.errorClass);
};

  //Скрыть ошибку
  _hideInputError = (formElement, inputElement) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(forms.inputErrorClass);
  errorElement.classList.remove(forms.errorClass);
  errorElement.textContent = '';
};

  //Добавление слушателей
  _setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector)

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //Валидация форм
  enableValidation() {

  const formList = Array.from(document.querySelectorAll(forms.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListener(formElement);
  });
  };
}
