import { deleteCard, pasteLike, deleteLike } from "./api.js";
import { templateCard} from "./constants.js";
//функция которая будет изменять содержимое клонированной из темплейта карточки, в ней мы присваиваем значения из массива, добавляет лайк, активируем урну с удалением карточки, так же привязываем
//так же присваиваем значения к попапам для картинок
export function createCard(card, userInfo, handleClick) {
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

  });

  cardImage.addEventListener('click', () => {
    handleClick(card.link, card.name)
  }
  )
  card.likes.forEach((like) => {
    if (like._id === userInfo.id) {
      cardButtonLike.classList.add('card__button-like_active')
    }
  });
  return cardClone;
};