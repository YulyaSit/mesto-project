import './pages/index.css'
import { selectors, buttonOpenPopupProfile, popupEditProfile, buttonAddCard, closeButtons, popupAdd, cardsMain, nameInput, profileForm, jobInput, profileName, profileProfession, 
  formElementAdd, profileAvatar, userInfo, avatarEditProfile, formAvatar, nameImageInput, linkImageInput, popups, inputLink, popupAvatar, buttonProfile,  buttonCard, buttonAvatar, popupPicture, popupImage, popupCaption} from './components/constants.js';

import { patchEditProfile, getEditProfile, patchEditAvatar, getCards, postCard } from './components/api';
import { openPopup, closePopup } from './components/modal.js';

import Api from './components/api'
import { createCard } from './components/card.js';

Promise.all([Api.getEditProfile(), getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
    profileAvatar.src = user.avatar;
    userInfo.id = user._id;
    user._id = userInfo.id
    cards.forEach((card) => {
      cardsMain.append(createCard(card,userInfo, openPopupImage))
    }) //берем массив карточек из сервера и вставляем в нашу разметку
  })
  .catch((err) => {
    console.log(err) //обработка ошибки
  })

export function openPopupImage(link, name) { //функция в которой передаем данные в попап открытия карточки(картинки)
  popupImage.src = link
  popupCaption.textContent = name
  openPopup(popupPicture)
}

buttonOpenPopupProfile.addEventListener('click', function () { //слушатель для попапа редактирования профиля(ниже описание подробное)
  //навешиваем слушатель, при клике на кнопку редактирования профиля срабатывает универсальная функция открытия попапа
  //привязываем к полям ввода текста значения, которые будут при активных значениях
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileProfession.textContent
})

avatarEditProfile.addEventListener('click', function () { //открытие попапа с редактированием аватара
  openPopup(popupAvatar)
})

function handleAvatarFormSubmit(evt) { // функция для  формы измненения авы
  evt.preventDefault()
  renderLoading(true, buttonAvatar) //функция изменение текста кнопки "Сохранение..." во время загрузки
  patchEditAvatar(inputLink.value)
    .then(data => {
      profileAvatar.src = data.avatar
      closePopup(popupAvatar)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((ok) => {
      renderLoading(false, buttonAvatar)
    })
};

formAvatar.addEventListener('submit', handleAvatarFormSubmit) //слушатель самбита для авы

closeButtons.forEach((button) => { //закрытие попапов на крестик
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

buttonAddCard.addEventListener('click', function () { //слушатель на кнопку открытия попапа добавления карточки
  openPopup(popupAdd);
});

function renderLoading(isLoading, button, buttonLoading = 'Сохранение..', buttonText = 'Сохранить') { //универсальная функция для загрузки
  if (isLoading) {
     button.value = buttonLoading
  } else {
     button.value = buttonText
  }
}
// Обработчик «отправки» формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  renderLoading(true, buttonProfile)
    patchEditProfile(nameInput.value, jobInput.value) //фетч для изменения данных о пользователе: имя и профессия
    .then(data => {
      profileName.textContent = data.name
      profileProfession.textContent = data.about
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((ok) => {
      renderLoading(false, buttonProfile)
    })
}



//функция для создания новой карточки через попап
function handleFormSubmitAdd(evt) { // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  evt.preventDefault();
  renderLoading(true, buttonCard)
  postCard(nameImageInput.value, linkImageInput.value) //вставка карточки 
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
      renderLoading(false, buttonCard)
    })
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit); //слушатель для формы профиля
formElementAdd.addEventListener('submit', handleFormSubmitAdd); //слушатель для формы создания карточки

popups.forEach(popup => { //закрытие на все попапы при клике мышки на оверлей
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  })
});
enableValidation(selectors); //вызываем функцию чтобы валидация работала на всех формах

import { enableValidation } from './components/validate.js';
