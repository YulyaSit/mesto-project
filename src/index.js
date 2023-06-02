import './pages/index.css'
import {
  buttonOpenPopupProfile, popupEditProfile, buttonAddCard, popupAdd, cardsMain, nameInput, jobInput, profileName, profileProfession,
  profileAvatar, userInfo, avatarEditProfile, formAvatar, selectors
} from './utils/constants.js';
import Api from './components/Api.js';
import Card from './components/Card';
import UserInfoo from './components/UserInfo';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section';


const avatarValidate = new FormValidator(selectors, formAvatar);
const profileValidate = new FormValidator(selectors, popupEditProfile);
const cardValidate = new FormValidator(selectors, popupAdd);
avatarValidate.enableValidation();
profileValidate.enableValidation();
cardValidate.enableValidation()
export const popupWithImage = new PopupWithImage('#popup-picture');
popupWithImage.setEventListeners()
export const api = new Api({
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

const popupAvatarEdit = new PopupWithForm(
  '#popup-avatar',
  {
    callback: ({ link }) => {
      popupAvatarEdit.renderLoading(true);
      api.patchEditAvatar(link)
        .then(data => {
          profileAvatar.src = data.avatar;
          popupAvatarEdit.close()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally((ok) => {
          popupAvatarEdit.renderLoading(false)
        })
    }
  }
);

popupAvatarEdit.setEventListeners();
avatarEditProfile.addEventListener('click', function () { //открытие попапа с редактированием аватара
  popupAvatarEdit.open();
})

const popupProfileEdit = new PopupWithForm(
  '#popup-edit',
  {
    callback: ({ name, profession }) => {
      popupProfileEdit.renderLoading(true);
      userInfoTest.setUserInfo(name, profession);
      popupProfileEdit.renderLoading(true);
      popupProfileEdit.close();
    }
  }
)
popupProfileEdit.setEventListeners()
popupProfileEdit.print();
buttonOpenPopupProfile.addEventListener('click', function () {
  popupProfileEdit.open();
  nameInput.value = profileName.textContent
  jobInput.value = profileName.textContent
})

export const section = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card(item, '#template-card');
    const cardElement = card.generate();
    section.addItem(cardElement);
  }
}, cardsMain);

export const userInfoTest = new UserInfoo({
  profileName: '.profile__name',
  profileProfession: '.profile__profession'
});

Promise.all([userInfoTest.getUserInfo(), api.getCards()])
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

const popupAddCard = new PopupWithForm(
  '#popup-add',
  {
    callback: ({ name, link }) => {
      popupAddCard.renderLoading(true);
      api.postCard(name, link) //вставка карточки
        .then((card) => {
          const newCard = new Card(card, '#template-card');
          section.addItem(newCard.generate());
          popupAddCard.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally((ok) => {
          popupAddCard.renderLoading(false);
        })
    }
  }
);
popupAddCard.setEventListeners();
buttonAddCard.addEventListener('click', function () { //слушатель на кнопку открытия попапа добавления карточки
  popupAddCard.open();
});