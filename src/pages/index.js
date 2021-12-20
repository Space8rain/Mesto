import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  forms,
  formPopupProfile,
  popupOpenProfileInfo,
  nameInput,
  activityInput,
  formPopupCard,
  templateSelector,
  popupFullImageSelector,
  profileNameSelector,
  profileActivitySelector,
  popupProfileSelector,
  popupNewCardSelector,
  popupOpenAddCard

} from '../utils/constants.js';

// Валидация
const validateProfile = new FormValidator(forms, formPopupProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(forms, formPopupCard);
validateCard.enableValidation();

// Отрисовка каждой карточки
function renderCard (data, templateSelector) {
  const card = new Card(data, () => {
    popupWithImage.open(data);
  }, templateSelector);
  return card.generateCard();
};

// Загрузка стандартных карточек
const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = renderCard(item, templateSelector)
    defaultCards.addItem(card)
  }
}, '.cards');
defaultCards.renderItems()

// Попап фулл картинки
const popupWithImage = new PopupWithImage(popupFullImageSelector);

// Попап добавления карточки
const popupCardForm = new PopupWithForm(popupNewCardSelector, (item) => {
  const card = renderCard(item, templateSelector);
  defaultCards.addItem(card);
});

// Открытие попапа добавления карточки
popupOpenAddCard.addEventListener('click', () => {
  validateCard.resetErrors();
  popupCardForm.open();
});

// Слушатель сабмита карточки
popupCardForm.setEventListeners();

// Управление отображением информации о пользователе на странице
const userInfo = new UserInfo({name: profileNameSelector, info: profileActivitySelector});

// Попап редактирования профиля
const popupProfileForm = new PopupWithForm(popupProfileSelector, (input) => {
  userInfo.setUserInfo(input)
});

// Слушатель сабмита формы профиля
popupProfileForm.setEventListeners();

// Открытие попапа формы профиля
popupOpenProfileInfo.addEventListener('click', () => {
  const profileValue = userInfo.getUserInfo();
  nameInput.value = profileValue.name;
  activityInput.value = profileValue.info;
  validateProfile.resetErrors();
  popupProfileForm.open();
});
