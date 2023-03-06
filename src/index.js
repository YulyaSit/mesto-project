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
const initialCards = [
  {
    name: 'Рыбов мне!',
    link: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Когда покодил',
    link: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
  },
  {
    name: 'Релакс',
    link: 'https://images.unsplash.com/photo-1572252821143-035a024857ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  },
  {
    name: 'А можно ненадо?',
    link: 'https://images.unsplash.com/photo-1570824105192-a7bb72b73141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=842&q=80'
  },
  {
    name: 'С нг кароч',
    link: 'https://images.unsplash.com/photo-1542108226-9130e1e83cc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80'
  },
  {
    name: 'И что ты мне сделаешь?',
    link: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80'
  }
]; //массив по ТЗ

export const selectors =
{
  formSelector: '.form',
  inputSelector: '.popup__name',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__name_invalid',
  errorClass: 'popup__input-error_active'
};

import { openPopup, closePopup } from './components/utils.js';

editProfileButton.addEventListener('mousedown', function () { //навешиваем слушатель, при клике на кнопку редактирования профиля срабатывает универсальная функция открытия попапа
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent; //привязываем к полям ввода текста значения, которые будут при активных значениях
  jobInput.value = profileProfession.textContent; // -//-//-
})

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('mousedown', () => closePopup(popup));
});

addCardButton.addEventListener('click', function () { //слушатель на кнопку открытия попапа добавления карточки
  openPopup(popupAdd);
});

import { createCard } from './components/card.js';

//чтобы карточки приняли новые значения, мы делаем перебор с помощью метода forEach и вставляем новые карточки в общий контейнер
initialCards.forEach(function (item) {
  cardsMain.append(createCard(item.link, item.name));
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//функция для создания новой карточки через попап
function handleFormSubmitAdd(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  cardsMain.prepend(createCard(linkImageInput.value, nameImageInput.value))
  closePopup(popupAdd);
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    closePopup(evt.target)
  })
})

enableValidation(selectors); //вызываем функцию чтобы валидация работала на всех формах

import { enableValidation } from './components/validate.js';