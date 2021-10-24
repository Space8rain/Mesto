const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__btn-edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const profileInfo = document.querySelector('.profile__info');
const submitProfile = popupElement.querySelector('.form')
const oldProfileName = profileInfo.querySelector('.profile__name');
const oldProfileActivity = profileInfo.querySelector('.profile__activity');
const newProfileName = popupElement.querySelector('#newName');
const newProfileActivity = popupElement.querySelector('#newActivity');


const openPopup = function () {
  newProfileName.value = oldProfileName.textContent
  newProfileActivity.value = oldProfileActivity.textContent
  popupElement.classList.add('popup_is-opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

const editProfile = function (event) {
  event.preventDefault();
  oldProfileName.textContent = newProfileName.value;
  oldProfileActivity.textContent = newProfileActivity.value;

  closePopup();
}


popupOpenButtonElement.addEventListener ('click', openPopup);
popupCloseButtonElement.addEventListener ('click', closePopup);
submitProfile.addEventListener ('submit', editProfile);
