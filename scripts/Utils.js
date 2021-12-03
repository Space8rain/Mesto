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

export const popupFullScreen = document.querySelector('.popup_type_fullscreen');
export const fullImageLink = popupFullScreen.querySelector('.popup__photo');
export const fullImageCaption = popupFullScreen.querySelector('.popup__caption');
export const popupCard = document.querySelector('.popup_type_card');
export const inputCardLink = popupCard.querySelector('#imglink');
export const inputCardName = popupCard.querySelector('#placename');
export const cardsColumns = document.querySelector('.cards');
export const forms = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Открытие попапов
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
};

///Закрытие попапов
export function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

// Закрытие попапов при нажатии esc
export function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  };
};

// Закрытие попапов при нажатии вне области попапа
export function closePopupByClickOverlay () {
  const popups = document.querySelectorAll('.popup')

  popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('popup_is-opened')) {
              closePopup(popup)
          };
          if (evt.target.classList.contains('popup__btn-close')) {
            closePopup(popup)
          };
      });
  });
};
