export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');  //кнопка редактирования профиля
export const popupEditProfile = document.querySelector('#popup-edit'); //попап Редактирования профиля
export const buttonAddCard = document.querySelector('.profile__button-add');  //кнопка добавления карточки
export const popupAdd = document.querySelector('#popup-add'); //попап добавления карточки
export const closeButtons = document.querySelectorAll('.popup__button-close');
export const cardsMain = document.querySelector('.cards'); //общий контейнер карточек
export const templateCard = document.querySelector('#template-card').content; //создали элемент теплейта с содержимым карточки 
export const popupPicture = document.querySelector('#popup-picture'); //попап для открытия картинок
export const popupImage = popupPicture.querySelector('.popup__image'); //картинка в попапе
export const popupCaption = popupPicture.querySelector('.popup__text'); //надпись в попапе
export const profileForm = document.forms["popup-form-edit"]; //форма редактирования
export const nameInput = profileForm.querySelector('.popup__name_firstname'); //инпут имени
export const jobInput = profileForm.querySelector('.popup__name_profession'); //инпут профессии
export const profileName = document.querySelector('.profile__name');//имя в профиле
export const profileProfession = document.querySelector('.profile__profession'); //профессия в профиле
export const formElementAdd = document.forms["popup-form-add"]; //форма добавления карточки
export const nameImageInput = popupAdd.querySelector('.popup__name_image'); //инпут с названием карточи
export const linkImageInput = popupAdd.querySelector('.popup__name_link'); //инпут с ссылкой карточки
export const popups = document.querySelectorAll('.popup'); //все попапы
export const avatarEditProfile = document.querySelector('.profile__container')
export const popupAvatar = document.querySelector('#popup-avatar')
export const profileAvatar = document.querySelector('.profile__avatar')
export const formAvatar = document.forms['popup-form-avatar']
export const inputLink = document.querySelector('.link-avatar')
export const userInfo = document.querySelector('.container')
export const buttonProfile = profileForm.querySelector('.popup__button')
export const buttonCard = formElementAdd.querySelector('.popup__button')
export const buttonAvatar = formAvatar.querySelector('.popup__button')
export const selectors =
{
  formSelector: '.form',
  inputSelector: '.popup__name',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__name_invalid',
  errorClass: 'popup__input-error_active'
}; //объект с селекторами для валидации

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