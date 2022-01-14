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
  profileAvatarSelector,
  popupProfileSelector,
  popupNewCardSelector,
  popupOpenAddCard,
  popupDeleteSelector,
  popupAvatarSelector,
  popupOpenAvatar,
  formAvatar
} from '../utils/constants.js';
import Api from '../components/Api';

let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33/',
  headers: {
    authorization: 'bd428fae-42b0-4e58-99f1-8231c317d8e5',
    "content-type": "application/json"
  }
})

const cardsData = api.getInitialCards();
const userData = api.getProfile();

Promise.all([cardsData, userData])
  .then((res) => {
    userId = res[1]._id;

    userData
      .then((res) => {
        userInfo.setUserInfo({
          profileName: res.name,
          profileActivity: res.about,
          avatar: res.avatar})
      })
      .catch((err) => {
        console.log(err)
      });

    cardsData
      .then((data) => {
        defaultCards.renderItems(data);
        return defaultCards
      })
      .catch((err) => {
        console.log(err)
      });
  })

// Загрузка стандартных карточек
const defaultCards = new Section({
  renderer: (item) => {
    const card = renderCard(item, templateSelector, userId)
    defaultCards.addItem(card)
  }
}, '.cards');

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
          })
        })
      },

      handleCardLike: () => {
        if (card.ifLiked()) {
          api.removeLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes.length)
            })
            .catch((err) => {
              console.log(err)
          })
        } else {
          api.addLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes.length)
            })
            .catch((err) => {
              console.log(err)
        })
        }
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

// Попап изменения аватра
const popupwithAvatar = new PopupWithForm(popupAvatarSelector, (item) => {
  popupwithAvatar.showLoading(true);
  api.changeAvatar(item.link)
    .then((res) => {
      userInfo.setUserInfo({
        profileName: res.name,
        profileActivity: res.about,
        avatar: res.avatar
      });
      popupwithAvatar.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => popupwithAvatar.showLoading(false))

})

// Открытие попапа изменения аватара
popupOpenAvatar.addEventListener('click', () => {
  validateAvatar.resetErrors();
  popupwithAvatar.open();
})

// Слушатель сабмита аватара
popupwithAvatar.setEventListeners();

// Попап добавления карточки
const popupCardForm = new PopupWithForm(popupNewCardSelector, (item) => {
  popupCardForm.showLoading(true);
  api.addUserCard(item.name, item.link)
      .then((item) => {
        const card = renderCard(item, templateSelector);
        defaultCards.addItem(card);
        popupCardForm.close()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => popupCardForm.showLoading(false))
});

// Открытие попапа добавления карточки
popupOpenAddCard.addEventListener('click', () => {
  validateCard.resetErrors();
  popupCardForm.open();
});

// Слушатель сабмита карточки
popupCardForm.setEventListeners();

// Управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  name: profileNameSelector,
  info: profileActivitySelector,
  avatar: profileAvatarSelector});

// Попап редактирования профиля
const popupProfileForm = new PopupWithForm(popupProfileSelector, (input) => {
  popupProfileForm.showLoading(true);
  api.editProfile(input.profileName, input.profileActivity)
    .then((res) => {
      userInfo.setUserInfo({
        profileName: res.name,
        profileActivity: res.about,
        avatar: res.avatar})
        popupProfileForm.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => popupProfileForm.showLoading(false))
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

// Валидация
const validateProfile = new FormValidator(forms, formPopupProfile);
validateProfile.enableValidation();
const validateCard = new FormValidator(forms, formPopupCard);
validateCard.enableValidation();
const validateAvatar = new FormValidator(forms, formAvatar);
validateAvatar.enableValidation();
