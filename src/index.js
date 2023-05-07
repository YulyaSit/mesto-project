import './pages/index.css'
const editProfileButton = document.querySelector('.profile__button-edit');  //кнопка редактирования профиля
export const popupEditProfile = document.querySelector('#popup-edit'); //попап Редактирования профиля
const addCardButton = document.querySelector('.profile__button-add');  //кнопка добавления карточки
export const popupAdd = document.querySelector('#popup-add'); //попап добавления карточки
const closeButtons = document.querySelectorAll('.popup__button-close');
export const cardsMain = document.querySelector('.cards'); //общий контейнер карточек
export const templateCard = document.querySelector('#template-card').content; //создали элемент теплейта с содержимым карточки 
export const popupPicture = document.querySelector('#popup-picture'); //попап для открытия картинок
export const popupImage = popupPicture.querySelector('.popup__image'); //картинка в попапе
export const popupCaption = popupPicture.querySelector('.popup__text'); //надпись в попапе
const profileForm = document.forms["popup-form-edit"]; //форма редактирования
export const nameInput = profileForm.querySelector('.popup__name_firstname'); //инпут имени
export const jobInput = profileForm.querySelector('.popup__name_profession'); //инпут профессии
export const profileName = document.querySelector('.profile__name');//имя в профиле
export const profileProfession = document.querySelector('.profile__profession'); //профессия в профиле
const formElementAdd = document.forms["popup-form-add"]; //форма добавления карточки
export const nameImageInput = popupAdd.querySelector('.popup__name_image'); //инпут с названием карточи
export const linkImageInput = popupAdd.querySelector('.popup__name_link'); //инпут с ссылкой карточки
export const disabledButtonAdd = popupAdd.querySelector('.popup__button') // кнопка сабмит у попапа карточки
const popups = document.querySelectorAll('.popup'); //все попапы
const editProfileAvatar = document.querySelector('.profile__container')
const popupAvatar = document.querySelector('#popup-avatar')
export const profileAvatar = document.querySelector('.profile__avatar')
const formAvatar = document.forms['popup-form-avatar']
const inputLink = document.querySelector('.link-avatar')
export const userInfo = document.querySelector('.container')

export const selectors =
{
  formSelector: '.form',
  inputSelector: '.popup__name',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__name_invalid',
  errorClass: 'popup__input-error_active'
};

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
}

import { patchEditProfile, getEditProfile, patchEditAvatar, getCards, postCard } from './components/api';
import { openPopup, closePopup } from './components/utils.js';

import { createCard } from './components/card.js';

Promise.all([getEditProfile(), getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
    profileAvatar.src = user.avatar;
    userInfo.id = user._id;
    cards.forEach((card) => {
      cardsMain.append(createCard(card, userInfo))
    })
  })
  .catch((err) => {
    console.log(err)
  })



editProfileButton.addEventListener('click', function () {
  //навешиваем слушатель, при клике на кнопку редактирования профиля срабатывает универсальная функция открытия попапа
  //привязываем к полям ввода текста значения, которые будут при активных значениях
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileProfession.textContent
})

editProfileAvatar.addEventListener('click', function () { //открытие попапа с редактированием аватара
  openPopup(popupAvatar)
})

function handleAvatarFormSubmit(evt) { // форма измненения авы
  evt.preventDefault()
  renderLoading(true)
  patchEditAvatar(inputLink.value)
    .then(data => {
      profileAvatar.src = data.avatar
      closePopup(popupAvatar)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((ok) => {
      renderLoading(false)
    })
};

formAvatar.addEventListener('submit', handleAvatarFormSubmit)

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

addCardButton.addEventListener('click', function () { //слушатель на кнопку открытия попапа добавления карточки
  openPopup(popupAdd);
});


// Обработчик «отправки» формы профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  renderLoading(true)
  patchEditProfile(nameInput.value, jobInput.value)
    .then(data => {
      profileName.textContent = data.name
      profileProfession.textContent = data.about
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((ok) => {
      renderLoading(false)
    })
}

function renderLoading(isLoading) {
  const buttons = Array.from(document.querySelectorAll('.popup__button'))
  if (isLoading) {
    buttons[0].value = "Сохранение..."
    buttons[1].value = "Создание..."
    buttons[2].value = "Сохранение..."
  } else {
    buttons[0].value = "Сохранить"
    buttons[1].value = "Создать"
    buttons[2].value = "Сохранить"
  }
}
//функция для создания новой карточки через попап
function handleFormSubmitAdd(evt) { // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  evt.preventDefault();
  renderLoading(true)
  postCard(nameImageInput.value, linkImageInput.value)
    .then((card) => {
      linkImageInput.value = card.link
      nameImageInput.value = card.name
      cardsMain.prepend(createCard(card, userInfo))
      closePopup(popupAdd);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((ok) => {
      renderLoading(false)
    })
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  })
});
enableValidation(selectors); //вызываем функцию чтобы валидация работала на всех формах

import { enableValidation } from './components/validate.js';
