export default class Card {

  constructor({data, handlers}, templateSelector, userId) {
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handlers.handleCardClick;
    this._handleCardDelete = handlers.handleCardDelete;
    this._handleCardLike = handlers.handleCardLike;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likeCounter = data.likes.length;
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
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonDelete = this._element.querySelector('.card__delete');
    this._likeCount = this._element.querySelector('.card__like-count');


    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._iconCardDelete();
    this._checkLikes();
    this._likeCount.textContent = this._likeCounter;
    this._setEventListeners();

    return this._element;
  }

  // Скрытие значка удаления на чужих карточках
  _iconCardDelete() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.style.display = 'none'
    }
  }

  // Удаление карточки
  deleteCard = () => {
    this._element.remove();
  }

  // Лайк карточки
  _handleLikeCard () {
    this._buttonLike.classList.toggle('card__like_active')
  }

  // Проверка где стоит наш лайк
  _checkLikes() {
    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._buttonLike.classList.add('card__like_active')
      }
    });
  }

  ifLiked() {
    if (this._buttonLike.classList.contains('card__like_active')) {
      return true
    }
  }

  updateLikes(likeCounter) {
    this._handleLikeCard();
    this._likeCount.textContent = likeCounter;
  }

  // Слушатели событий
  _setEventListeners () {
    this._buttonLike.addEventListener('click', this._handleCardLike);
    this._cardImage.addEventListener('click', this._handleCardClick);
    if (this._userId === this._ownerId) {
      this._buttonDelete.addEventListener('click', this._handleCardDelete);
    }
  }
}
