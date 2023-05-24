export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.settings = options.settings;
  }
  getEditProfile()  { //гет запрос для информации о пользователе
  return fetch(`${this.baseUrl}/users/me`, { 
    headers: this.headers
  })
  .then(this.settings)
  }

  patchEditProfile (profileName, profileProfession) {
  return fetch(`${this.baseUrl}/users/me`, { //патч запрос на изменение имени и профессии
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileProfession
    })
  })
  .then(this.settings)
}

patchEditAvatar (profileAvatar) { //патч запрос для изменения аватара
  return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
  .then(this.settings)
}

getCards() { //гет запрос карточек 
  return fetch(`${this.baseUrl}/cards`, {
  headers: this.headers
})
.then(this.settings)
}

postCard(name, link) {
  return fetch(`${this.baseUrl}/cards`, { //пост запрос чтобы запостить карточку
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(this.settings)
}

deleteCard(card) { //делит запрос для удаления карточки
  return fetch(`${this.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: this.headers,
  })
  .then(this.settings)
}

pasteLike(card) { //пут запрос для постановки лайка
  return fetch(`${this.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: this.headers
  })
  .then(this.settings)
}


deleteLike(card) { //делит запрос для удаления лайка
  return fetch(`${this.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: this.headers
  })
  .then(this.settings)
}
}