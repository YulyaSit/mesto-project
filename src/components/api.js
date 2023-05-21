import { config } from "../components/constants.js"


export default class Api {
  constructor(baseUrl, headers, settings) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.settings = settings
  }
  getEditProfile()  { //гет запрос для информации о пользователе
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: this.headers,
  })
    .then(this.settings)
}

patchEditProfile (profileName, profileProfession) {
  return fetch(`${config.baseUrl}/users/me`, { //патч запрос на изменение имени и профессии
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileProfession
    })
  })
    .then(config.settings)
}
}

const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '3720e224-e620-430e-9649-e363bea978d6',
    'Content-Type': 'application/json'
  },
  settings: ((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
})

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '3720e224-e620-430e-9649-e363bea978d6',
    'Content-Type': 'application/json'
  },
  settings: ((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
} //объект для АПИ




























export const patchEditAvatar = (profileAvatar) => { //патч запрос для изменения аватара
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
    .then(config.settings)
}

export const getCards = () => { //гет запрос карточек 
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, { //пост запрос чтобы запостить карточку
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(config.settings)
}

export const deleteCard = (card) => { //делит запрос для удаления карточки
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(config.settings)
}

export const pasteLike = (card) => { //пут запрос для постановки лайка
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(config.settings)
}


export const deleteLike = (card) => { //делит запрос для удаления лайка
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(config.settings)
}