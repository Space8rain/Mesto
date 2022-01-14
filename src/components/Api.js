export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers
  }

  // Проверка с сервером
  _errorHandler = (res) => {
    if (res.ok) {
      return res.json()
    }
  return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Запросить карточки с сервера
  getInitialCards() {
    return fetch (`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._errorHandler)
  }

  // Добавить/отправить карточку пользователя на сервер
  addUserCard(name, link) {
    return fetch (`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._errorHandler)
  }

  // Удаление карточки с сервера
  deleteUserCard(id) {
    return fetch (`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._errorHandler)
  }

  // Добавление лайка на сервере
  addLike(id) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._errorHandler)
  }

  // Удаление лайка на сервере
  removeLike(id) {
    return fetch (`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._errorHandler)
  }

  // Получить данные профиля
  getProfile() {
    return fetch (`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._errorHandler)
  }

  // Заменить аватар
  changeAvatar(avatar) {
    return fetch (`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._errorHandler)
  }

  // Отправить данные профиля
  editProfile(name, about) {
    return fetch (`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._errorHandler)
  }
}


