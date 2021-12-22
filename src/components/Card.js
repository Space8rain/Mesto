export default class Card {

  constructor(data, handleCardClick, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  // Выбор трафарета
  _getTemplate() {
    return this._templateElement = document.getElementById(this._templateSelector).content.querySelector('.card').cloneNode(true);
}

  // Наполнение карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  // Удаление карточки
  _handleDeleteCard = () => {
    this._element.remove();
  }

  // Лайк карточки
  _handleLikeCard (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  // Слушатели событий
  _setEventListeners () {
    this._element.querySelector('.card__like').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.card__delete').addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}
