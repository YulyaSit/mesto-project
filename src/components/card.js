import { templateCard, popupImage, popupCaption, popupPicture } from "../index.js";
import { openPopup } from "../components/utils.js";
import { deleteCard, pasteLike, deleteLike } from "./api.js";
//функция которая будет изменять содержимое клонированной из темплейта карточки, в ней мы присваиваем значения из массива, добавляет лайк, активируем урну с удалением карточки, так же привязываем
//так же присваиваем значения к попапам для картинок
export function createCard(card, userInfo) {
  const cardClone = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image')
  const cardUrn = cardClone.querySelector('.button__urn')
  const userLikes = cardClone.querySelector('.card__likes')
  if (userInfo.id === card.owner._id) {
    cardUrn.classList.add('button__urn_active')
  }
  userLikes.textContent = card.likes.length
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardClone.querySelector('.card__name').textContent = card.name;
  cardUrn.addEventListener('click', function () { //удаление карточки
    deleteCard(card)
      .then((card) => {
        card._id = cardClone.remove()
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль, если запрос неуспешный
      });
  });
  const cardButtonLike = cardClone.querySelector('.card__button-like')
  cardButtonLike.addEventListener('click', function (evt) {   //добавили класс изменение цвета лайка при клике
    if (!evt.target.classList.contains('card__button-like_active')) {  //проверяем активный класс
      pasteLike(card._id)
        .then((card) => {
          evt.target.classList.add('card__button-like_active')
          userLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль, если запрос неуспешный
        });
    } else {
      deleteLike(card._id)
        .then((card) => {
          evt.target.classList.remove('card__button-like_active')
          userLikes.textContent = card.likes.length
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль, если запрос неуспешный
        });
    }
  })
  cardImage.addEventListener('click', function () {
    popupImage.src = card.link
    popupImage.alt = card.name
    popupCaption.textContent = cardClone.textContent
    openPopup(popupPicture)
  });
  return cardClone;
};