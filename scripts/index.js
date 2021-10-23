const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__btn-edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const profileInfo = document.querySelector('.profile__info');
const submitProfile = popupElement.querySelector('.form')
let oldProfileName = profileInfo.querySelector('.profile__name');
let oldProfileActivity = profileInfo.querySelector('.profile__activity');
let NewProfileName = popupElement.querySelector('#newName');
let NewProfileActivity = popupElement.querySelector('#newActivity');


const openPopup = function () {
  NewProfileName.value = oldProfileName.textContent
  NewProfileActivity.value = oldProfileActivity.textContent
  popupElement.classList.add('popup_is-opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

const editProfile = function (event) {
  event.preventDefault();
  oldProfileName.textContent = NewProfileName.value;
  oldProfileActivity.textContent = NewProfileActivity.value;

  closePopup();
}


popupOpenButtonElement.addEventListener ('click', openPopup);
popupCloseButtonElement.addEventListener ('click', closePopup);
submitProfile.addEventListener ('submit', editProfile);
