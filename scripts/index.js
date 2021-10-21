const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__btn-edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const profileInfo = document.querySelector('.profile__info');
const popupSaveInfo = popupElement.querySelector('.popup__btn-save');

const openPopup = function () {
  popupElement.querySelector('#newName').value = profileInfo.querySelector('.profile__name').textContent;
  popupElement.querySelector('#newActivity').value = profileInfo.querySelector('.profile__activity').textContent;
  popupElement.classList.add('popup_is-opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

const editProfile = function (event) {
  event.preventDefault();
  profileInfo.querySelector('.profile__name').textContent = popupElement.querySelector('#newName').value;
  profileInfo.querySelector('.profile__activity').textContent = popupElement.querySelector('#newActivity').value;

  // let oldProfileName = profileInfo.querySelector('.profile__name');
  // let oldProfileActivity = profileInfo.querySelector('.profile__activity');
  // let NewProfileName = popupElement.querySelector('#newName');
  // let NewProfileActivity = popupElement.querySelector('#newActivity');

  // oldProfileName.textContent = NewProfileName.value;
  // oldProfileActivity.textContent = NewProfileActivity.value;

  closePopup();
}


popupOpenButtonElement.addEventListener ('click', openPopup);
popupCloseButtonElement.addEventListener ('click', closePopup);
popupSaveInfo.addEventListener ('click', editProfile);
