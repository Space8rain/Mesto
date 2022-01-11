export default class Card {

  constructor({data, handlers}, templateSelector, userId) {
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handlers.handleCardClick;
    this._handleCardDelete = handlers.handleCardDelete;
    this._handleCardLike = handlers.handleCardLike;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._Id;
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

  // Скрытие значка удаления на чужих карточках
  _iconCardDelete() {
    if (this._userId !== this._ownerId) {
      this._element.querySelector('.card__delete').style.display = 'none'
    }
  }

  // Удаление карточки
  deleteCard = () => {
    this._element.remove();
  }

  // Лайк карточки
  _handleLikeCard (evt) {
    evt.target.classList.toggle('card__like_active');
  }

  // Слушатели событий
  _setEventListeners () {
    this._element.querySelector('.card__like').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.card__delete').addEventListener('click', this._handleCardDelete);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}
