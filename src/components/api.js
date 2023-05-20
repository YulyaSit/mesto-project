import { config } from "../components/constants.js"

export const getEditProfile = () => { //гет запрос для информации о пользователе
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(config.settings)
}

export const patchEditProfile = (profileName, profileProfession) => {
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