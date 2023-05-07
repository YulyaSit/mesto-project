import { config } from "../index.js"


export const getEditProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(config.settings)
}

export const patchEditProfile = (profileName, profileProfession) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileProfession
    })
  })
    .then(config.settings)
}

export const patchEditAvatar = (profileAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
    .then(config.settings)
}

export const getCards = () => {
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
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(config.settings)
}

export const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(config.settings)
}

export const pasteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(config.settings)
}


export const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(config.settings)
}