import './pages/index.css'
import { buttonOpenPopupProfile, popupEditProfile, buttonAddCard, closeButtons, popupAdd, cardsMain, nameInput, profileForm, jobInput, profileName, profileProfession,
  formElementAdd, profileAvatar, userInfo, avatarEditProfile, formAvatar, nameImageInput, linkImageInput, popups, inputLink, popupAvatar, buttonProfile,  buttonCard, buttonAvatar, popupPicture, popupImage, popupCaption, UserInfoObj} from './components/constants.js';
import  Api from './components/Api.js';
import Card from './components/CCard';
import UserInfoo from './components/UserInfo';
import FormValidator from './components/validate.js';
import { createCard } from './components/card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

// export const openPopupEdit = new PopupWithForm('#popup-edit')
// openPopupEdit.setEventListeners()
// export const openPopupCard = new PopupWithForm('#popup-add')
// openPopupCard.setEventListeners()
// export const openPopupAvatar = new PopupWithForm('#popup-avatar')
// openPopupAvatar.setEventListeners()

const profileValidate = new FormValidator({
  inputSelector: '.popup__name',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_inactive',
  inputErrorClass: '.popup__name_invalid',
  errorClass: '.popup__input-error_active'
}, {
  form: '.form'
})
profileValidate.enableValidation()

export const popupWithImage = new PopupWithImage('#popup-picture');
popupWithImage.setEventListeners();

export const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
  authorization: '3720e224-e620-430e-9649-e363bea978d6',
    'Content-Type': 'application/json'
  },
  settings: (res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
})

export const section = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(item, '#template-card');
    const cardElement = card.generate();
    section.addItem(cardElement);
  }
}, cardsMain);

export const userInfoTest = new UserInfoo( {
  profileName : '.profile__name',
  profileProfession :'.profile__profession'
} );

Promise.all([api.getEditProfile(), api.getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
    profileAvatar.src = user.avatar;
    userInfo.id = user._id;
    user._id = userInfo.id;

    section.setItems(cards);

    section.renderItems();
  })
  .catch((err) => {
    console.log(err) //обработка ошибки
  })



buttonOpenPopupProfile.addEventListener('click', function () { //слушатель для попапа редактирования профиля(ниже описание подробное)
  //навешиваем слушатель, при клике на кнопку редактирования профиля срабатывает универсальная функция открытия попапа
  //привязываем к полям ввода текста значения, которые будут при активных значениях
  popup.open(popupEditProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileProfession.textContent
})


const popupAvatarEdit = new PopupWithForm(
  '#popup-avatar',
  {
    callback: ( { url } ) => {
      api.patchEditAvatar(url)
      .then(data => {
        profileAvatar.src = data.avatar;
        popupAvatarEdit.close()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
);
popupAvatarEdit.setEventListeners();
popupAvatarEdit.print();

avatarEditProfile.addEventListener('click', function () { //открытие попапа с редактированием аватара
  popupAvatarEdit.open();
})

// function handleAvatarFormSubmit(evt) { // функция для  формы измненения авы
//   evt.preventDefault()
//   renderLoading(true, buttonAvatar) //функция изменение текста кнопки "Сохранение..." во время загрузки
//   api.patchEditAvatar(inputLink.value)
//     .then(data => {
//       profileAvatar.src = data.avatar
//       popup.close(popupAvatar)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//     .finally((ok) => {
//       renderLoading(false, buttonAvatar)
//     })
// };

// formAvatar.addEventListener('submit', handleAvatarFormSubmit) //слушатель самбита для авы\
/*closeButtons.forEach((button) => { //закрытие попапов на крестик
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});*/

const popupAddCard = new PopupWithForm('#popup-add');
popupAddCard.setEventListeners();
popupAddCard.print();

buttonAddCard.addEventListener('click', function () { //слушатель на кнопку открытия попапа добавления карточки
  popupAddCard.open();
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
  api.patchEditProfile(nameInput.value, jobInput.value) //фетч для изменения данных о пользователе: имя и профессия
    .then(data => {
      profileName.textContent = data.name
      profileProfession.textContent = data.about
      popup.close(popupEditProfile);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((ok) => {
      renderLoading(false, buttonProfile)
    })
}

//popup.setEventListeners()
//функция для создания новой карточки через попап
function handleFormSubmitAdd(evt) { // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  evt.preventDefault();
  renderLoading(true, buttonCard)
  api.postCard(nameImageInput.value, linkImageInput.value) //вставка карточки
    .then((card) => {
      linkImageInput.value = card.link
      nameImageInput.value = card.name
      cardsMain.prepend(createCard(card, userInfo))
      popup.close(popupAdd);
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



import Section from './components/Section';import UserInfo from './components/UserInfo';

