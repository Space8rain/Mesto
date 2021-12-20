export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const forms = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


export const popupProfile = document.querySelector('.popup_type_profile');
export const formPopupProfile = popupProfile.querySelector('.form');
export const nameInput = popupProfile.querySelector('#newName');
export const activityInput = popupProfile.querySelector('#newActivity');

export const popupCard = document.querySelector('.popup_type_card');
export const formPopupCard = popupCard.querySelector('.form');

// Кнопки открытия попапов
export const popupOpenAddCard = document.querySelector('.button_type_add');
export const popupOpenProfileInfo = document.querySelector('.profile__btn-edit');

// Селекторы
export const templateSelector = 'user-card-template';
export const popupNewCardSelector = '.popup_type_card';
export const popupFullImageSelector = '.popup_type_fullscreen';
export const popupProfileSelector = '.popup_type_profile';
export const profileNameSelector = '.profile__name';
export const profileActivitySelector = '.profile__activity';
