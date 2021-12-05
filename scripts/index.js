import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, cardsColumns, openPopup, closePopup, closePopupByClickOverlay, forms} from './Utils.js'

const popupProfile = document.querySelector('.popup_type_profile');
const formPopupProfile = popupProfile.querySelector('.form');
const popupOpenProfileInfo = document.querySelector('.profile__btn-edit');
const profileInfo = document.querySelector('.profile__info');
const submitProfile = popupProfile.querySelector('.form_type_profile')
const oldProfileName = profileInfo.querySelector('.profile__name');
const oldProfileActivity = profileInfo.querySelector('.profile__activity');
const newProfileName = popupProfile.querySelector('#newName');
const newProfileActivity = popupProfile.querySelector('#newActivity');
const popupOpenAddCard = document.querySelector('.button_type_add');
const popupCard = document.querySelector('.popup_type_card');
const inputCardLink = popupCard.querySelector('#imglink');
const inputCardName = popupCard.querySelector('#placename');
const submitCard = document.querySelector('.form_type-card');
const templateCard = document.querySelector('#user-card-template');

// Валидация
const validateProfile = new FormValidator(forms, formPopupProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(forms, submitCard);
validateCard.enableValidation();

// Загрузка стандартных карточек
initialCards.forEach((data) => {
  const cardElement = renderCard(data);
  cardsColumns.append(cardElement)
});

// Отрисовка каждой карточки
function renderCard (item) {
  const card = new Card(item, templateCard);
  const cardElement = card.generateCard();
  return cardElement;
};

// Добавление пользовательских карточек
function addCard (evt) {
  evt.preventDefault();
  const newCard = {
    link: inputCardLink.value,
    name: inputCardName.value,
  };
  const cardElement = renderCard (newCard);
  cardsColumns.prepend(cardElement);
  closePopup(popupCard);
};

// Редактирование профиля
function editProfile (evt) {
  evt.preventDefault();
  oldProfileName.textContent = newProfileName.value;
  oldProfileActivity.textContent = newProfileActivity.value;
  closePopup(popupProfile);
};

// Слушатели событий
popupOpenProfileInfo.addEventListener('click', () => {
  newProfileName.value = oldProfileName.textContent;
  newProfileActivity.value = oldProfileActivity.textContent;
  openPopup(popupProfile);
});

// Сохранить настройки пользователя
submitProfile.addEventListener('submit', editProfile);

// Открыть форму для новой карточки
popupOpenAddCard.addEventListener('click', () => {
  inputCardLink.value = '';
  inputCardName.value = '';
  validateCard.resetErrors();
  openPopup(popupCard)
});

// Закрыть попап при клике по оверлею
closePopupByClickOverlay();

// Сохранить новую карточку
submitCard.addEventListener('submit', addCard);
