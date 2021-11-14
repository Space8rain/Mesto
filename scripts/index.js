const popupProfile = document.querySelector('.popup_type_profile');
const popupOpenProfileInfo = document.querySelector('.profile__btn-edit');
const profileInfo = document.querySelector('.profile__info');
const submitProfile = popupProfile.querySelector('.form_type_profile')
const oldProfileName = profileInfo.querySelector('.profile__name');
const oldProfileActivity = profileInfo.querySelector('.profile__activity');
const newProfileName = popupProfile.querySelector('#newName');
const newProfileActivity = popupProfile.querySelector('#newActivity');
const popupOpenAddCard = document.querySelector('.button_type_add');
const popupCard = document.querySelector('.popup_type_card');
const cardsColumns = document.querySelector('.cards');
const inputCardLink = popupCard.querySelector('#imglink');
const inputCardName = popupCard.querySelector('#placename');
const itemTemplate = document.querySelector('#user-card');
const submitCard = popupCard.querySelector('.form_type-card');
const popupFullScreen = document.querySelector('.popup_type_fullscreen');
const fullImageLink = popupFullScreen.querySelector('.popup__photo');
const fullImageCaption = popupFullScreen.querySelector('.popup__caption');

const initialCards = [
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


// Загрузка стандартных карточек
initialCards.forEach (function (item) {
  const cardElement = renderCard(item);
  cardsColumns.append(cardElement);
});

// Отрисовка каждой карточки
function renderCard (item) {
  const cardElement = itemTemplate.content.cloneNode(true);


  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  setListeners(cardElement);

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

function setListeners (item) {
  item.querySelector('.card__like').addEventListener('click', handleLike);
  item.querySelector('.card__delete').addEventListener('click', handleDelete);
  item.querySelector('.card__image').addEventListener('click', handleFullImage);
};

// Лайк карточки
function handleLike (evt) {
  evt.target.classList.toggle('card__like_active');
};

// Удаление карточки
function handleDelete (evt) {
  evt.target.closest('.card').remove();
};

// Открытие картинки
function handleFullImage (evt) {

  fullImageLink.src = evt.target.closest('.card__image').src;
  fullImageLink.alt = evt.target.closest('.card__image').alt;
  fullImageCaption.textContent = evt.target.closest('.card__image').alt;
  openPopup(popupFullScreen);
};

// Открытие/закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupByClickOverlay(popup));
};

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('click', closePopupByClickOverlay(popup));
};

// Закрытие при нажатии esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  };
};

function closePopupByClickOverlay () {
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

submitProfile.addEventListener('submit', editProfile);

popupOpenAddCard.addEventListener('click', () => {

  const buttonElement = popupCard.querySelector('.popup__btn-save_type_card')

  buttonElement.disabled = true;
  buttonElement.classList.add('popup__btn_disable');
  inputCardLink.value = '';
  inputCardName.value = '';

  openPopup(popupCard)
});

submitCard.addEventListener('submit', addCard);


