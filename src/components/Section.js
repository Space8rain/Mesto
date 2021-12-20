export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавление елемента в выбранный контейрнер
  addItem(item) {
    this._container.prepend(item);
  }

  // Отрисовка всех елементов
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
