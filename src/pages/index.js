import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
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
  popupOpenAddCard,
  popupDeleteSelector
} from '../utils/constants.js';
import Api from '../components/Api';

let userId;

// Валидация
const validateProfile = new FormValidator(forms, formPopupProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(forms, formPopupCard);
validateCard.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/cohort-33/',
  headers: {
    authorization: 'bd428fae-42b0-4e58-99f1-8231c317d8e5',
    "content-type": "application/json"
  }
})

const cardsData = api.getInitialCards();

// Загрузка стандартных карточек
const defaultCards = new Section({
  renderer: (item) => {
    const card = renderCard(item, templateSelector, userId)
    defaultCards.addItem(card)
  }
}, '.cards');


// api.getInitialCards()
//   .then((data) => {
//     const defaultCards = new Section({
//       items: data,
//       renderer: (item) => {
//         const card = renderCard(item, templateSelector, userId)
//         defaultCards.addItem(card)
//       }
//     }, '.cards');
//     defaultCards.renderItems()
//   })
//   .catch((err) => {
//       console.log(err)
//   });

Promise.all([cardsData])
  .then((res) => {
    cardsData
      .then((data) => {
        defaultCards.renderItems(data);
        return defaultCards
      })
      .catch((err) => {
        console.log(err)
      });
  })

// Отрисовка каждой карточки
function renderCard (data, templateSelector) {
  const card = new Card({
    data,
    handlers: {
      handleCardClick: () => {
        popupWithImage.open(data)
      },

      handleCardDelete: () => {
        popupDeleteSubmit.open();
        popupDeleteSubmit.submit(() => {
          api.deleteUserCard(data._id)
            .then(() => {
              card.deleteCard();
              popupDeleteSubmit.close()
            })
            .catch((err) => {
              console.log(err)
          });
        })
      }
    }
  }, templateSelector, userId);
  return card.generateCard();
};

// Попап удаления карточки
const popupDeleteSubmit = new PopupWithSubmit(popupDeleteSelector);
popupDeleteSubmit.setEventListeners();

// Попап фулл картинки
const popupWithImage = new PopupWithImage(popupFullImageSelector);
popupWithImage.setEventListeners();

// Попап добавления карточки
const popupCardForm = new PopupWithForm(popupNewCardSelector, (item) => {
  api.addUserCard(item.name, item.link)
      .then((item) => {
        const card = renderCard(item, templateSelector);
        defaultCards.addItem(card);
        popupCardForm.close()
      })
      .catch((err) => {
        console.log(err)
      });
  // const card = renderCard(item, templateSelector);
  // defaultCards.addItem(card);
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
