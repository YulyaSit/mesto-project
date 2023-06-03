export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse() {
    return (res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}` + url, options).then(this._checkResponse())
  }

  getEditProfile() { //гет запрос для информации о пользователе
    return this._request(`/users/me`, {
      headers: this._headers
    })
  }

  patchEditProfile(profileName, profileProfession) {
    return this._request(`/users/me`, { //патч запрос на изменение имени и профессии
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileProfession
      })
    })
  }

  patchEditAvatar(profileAvatar) { //патч запрос для изменения аватара
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: profileAvatar
      })
    })
  }

  getCards() { //гет запрос карточек 
    return this._request(`/cards`, {
      headers: this._headers
    })
  }

  postCard(name, link) {
    return this._request(`/cards`, { //пост запрос чтобы запостить карточку
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(card) { //делит запрос для удаления карточки
    return this._request(`/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  pasteLike(card) { //пут запрос для постановки лайка
    return this._request(`/cards/likes/${card}`, {
      method: 'PUT',
      headers: this._headers
    })
  }


  deleteLike(card) { //делит запрос для удаления лайка
    return this._request(`/cards/likes/${card}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}