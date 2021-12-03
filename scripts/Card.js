import {popupFullScreen, fullImageLink, fullImageCaption, inputCardLink, inputCardName, popupCard, cardsColumns} from './Utils.js'
import {openPopup} from './Utils.js'

export class Card {
  static _itemTemplate = document.querySelector('#user-card-template');

  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  // Выбор трафарета
  _getTemplate() {
  this._templateSelector = document.querySelector('#user-card-template').content.cloneNode(true);
  const _templateElement = this._templateSelector;

  return _templateElement
}
  // Наполнение карточки
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setListeners(this._element);

    return this._element;
  }

  // Удаление карточки
  _handleDeleteCard (evt) {
    evt.target.closest('.card').remove();
  }

  // Лайк карточки
  _handleLikeCard (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  // Открытие картинки
  _handleFullImage (evt) {

    fullImageLink.src = evt.target.closest('.card__image').src;
    fullImageLink.alt = evt.target.closest('.card__image').alt;
    fullImageCaption.textContent = evt.target.closest('.card__image').alt;
    openPopup(popupFullScreen);
  }

  // Слушатели событий
  _setListeners (card) {
    card.querySelector('.card__like').addEventListener('click', this._handleLikeCard);
    card.querySelector('.card__delete').addEventListener('click', this._handleDeleteCard);
    card.querySelector('.card__image').addEventListener('click', this._handleFullImage);
  }
}

