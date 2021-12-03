// //Показать ошибку
// const showInputError = (formElement, inputElement, errorMessage) => {

//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

//   inputElement.classList.add(forms.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(forms.errorClass);
// };

// //Скрыть ошибку
// const hideInputError = (formElement, inputElement) => {

//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

//   inputElement.classList.remove(forms.inputErrorClass);
//   errorElement.classList.remove(forms.errorClass);
//   errorElement.textContent = '';
// };


// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //Перевлючение состояния кнопки
// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.disabled = true;
//     buttonElement.classList.add('popup__btn_disable');
//   } else {
//     buttonElement.disabled = false;
//     buttonElement.classList.remove('popup__btn_disable');
//   }
// };

//Проверка форм
// function checkInputValidity (formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };


// //Добавление слушателей
// const setEventListener = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(forms.inputSelector));
//   const buttonElement = formElement.querySelector(forms.submitButtonSelector)

//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// //Валидация форм
// const enableValidation = () => {

//   const formList = Array.from(document.querySelectorAll(forms.formSelector));

//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });

//     setEventListener(formElement);
//   });
// };


// enableValidation();
