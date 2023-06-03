import './pages/index.css'
import {
  buttonOpenPopupProfile, popupEditProfile, buttonAddCard, popupAdd, nameInput, jobInput, avatarEditProfile, formAvatar, selectors
} from './utils/constants.js';
import Api from './components/Api.js';
import Card from './components/Card'
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import Section from './components/Section';
import UserInfo from './components/UserInfo';

const avatarValidate = new FormValidator(selectors, formAvatar);
const profileValidate = new FormValidator(selectors, popupEditProfile);
const cardValidate = new FormValidator(selectors, popupAdd);
avatarValidate.enableValidation();
profileValidate.enableValidation();
cardValidate.enableValidation()
const popupWithImage = new PopupWithImage('#popup-picture');
popupWithImage.setEventListeners()

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: '3720e224-e620-430e-9649-e363bea978d6',
    'Content-Type': 'application/json'
  }
})

const userInfoOwn = new UserInfo( {
  nameSelector: '.profile__name',
  jobSelector: '.profile__profession',
  avatarSelector: '.profile__avatar',
  idSelector: '.container'
} );

const popupAvatarEdit = new PopupWithForm(
  '#popup-avatar',
  {
    callback: ({ link }) => {
      popupAvatarEdit.renderLoading(true);
      api.patchEditAvatar(link)
        .then(data => {
          userInfoOwn.setUserInfo( {
            name: data.name,
            about: data.about,
            avatar: data.avatar,
            _id: data._id
          } );
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
      api.patchEditProfile(name, profession)
        .then(data => {
          userInfoOwn.setUserInfo({
            name: data.name,
            about: data.about,
            avatar: data.avatar,
            _id: data._id
          })
          popupProfileEdit.close();
        })
        .catch((err) => {
          console.log(err)
        })
        .finally((ok) => {
          popupProfileEdit.renderLoading(false)
        })
    }
  }
)
popupProfileEdit.setEventListeners()

buttonOpenPopupProfile.addEventListener('click', function () {
  popupProfileEdit.open();
  const { name, about} = userInfoOwn.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
})

function createCard(item) {
  const card = new Card(
    item,
    '#template-card',
    api,
    {handleCardClick: () => {
      popupWithImage.open(item.link, item.name);
    }});

  const cardElement = card.generate();

  return cardElement;
}

export const section = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    section.addItem(cardElement);
  }
}, '.cards');

Promise.all([api.getEditProfile(), api.getCards()])
  .then(([user, cards]) => {
    userInfoOwn.setUserInfo(
      { name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id }
      );
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
          const newCard = new Card(card, '#template-card', api, {
            handleCardClick: function () {
              popupWithImage.open(item.link, item.name)
            }
          });
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