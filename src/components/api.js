export const getEditProfile = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
    method: 'GET',
    headers: {
      authorization: '3720e224-e620-430e-9649-e363bea978d6'
    }
  })
}

export const patchEditProfile = (profileName, profileProfession) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-23/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '3720e224-e620-430e-9649-e363bea978d6',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileProfession
    })
  })
  .then((res) => {
    console.log(res.json())
  })
}
