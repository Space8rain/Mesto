class Card {
  static _itemTemplate = document.querySelector('#user-card-template');

  constructor() {

  }

  renderCard = () => {
    const cardElement = Card._itemTemplate.content.cloneNode(true);

    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    setListeners(cardElement);

    return cardElement;
  }
}
