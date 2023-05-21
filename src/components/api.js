import { config } from "../components/constants.js"


export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  getEditProfile()  { //гет запрос для информации о пользователе
  return fetch(`${this.baseUrl}/users/me`, { 
    headers: this.headers
  })
  }

  patchEditProfile (profileName, profileProfession) {
  return fetch(`${this.options}/users/me`, { //патч запрос на изменение имени и профессии
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileProfession
    })
  })
}

patchEditAvatar (profileAvatar) { //патч запрос для изменения аватара
  return fetch(`${this.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
}

getCards() { //гет запрос карточек 
  return fetch(`${this.baseUrl}/cards`, {
  headers: this.headers
})
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
}

deleteCard(card) { //делит запрос для удаления карточки
  return fetch(`${this.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: this.headers,
  })
}

pasteLike(card) { //пут запрос для постановки лайка
  return fetch(`${this.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: this.headers
  })
}


deleteLike(card) { //делит запрос для удаления лайка
  return fetch(`${this.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: this.headers
  })
}
}
export const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '3720e224-e620-430e-9649-e363bea978d6',
    'Content-Type': 'application/json'
  }
})

console.log(api)
