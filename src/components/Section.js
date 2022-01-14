export default class Section {
  constructor ({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавление елемента в выбранный контейрнер
  addItem(item) {
    this._container.prepend(item);
  }

  // Отрисовка всех елементов
  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }
}
