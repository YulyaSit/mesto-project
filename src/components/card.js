import { templateCard, popupImage, popupCaption, popupPicture, userInfo } from "../index.js";
import { openPopup } from "../components/utils.js";
import { deleteCard, getCards } from "./api.js";
//функция которая будет изменять содержимое клонированной из темплейта карточки, в ней мы присваиваем значения из массива, добавляет лайк, активируем урну с удалением карточки, так же привязываем
//так же присваиваем значения к попапам для картинок
export function createCard(card, userInfo) {
  const cardClone = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image')
  const cardUrn = cardClone.querySelector('.button__urn')
if (userInfo.id === card.owner._id) {
  cardUrn.classList.add('button__urn_active')
}
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardClone.querySelector('.card__name').textContent = card.name;
  cardUrn.addEventListener('click', function () {
    deleteCard(card)
    .then((card) => {
      card._id = cardClone.remove()
    });
  });
  cardClone.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__button-like')) {
      evt.target.classList.toggle('card__button-like_active');
    };
  });
  cardImage.addEventListener('click', function () {
    popupImage.src = card.link
    popupImage.alt = card.name
    popupCaption.textContent = cardClone.textContent
    openPopup(popupPicture)
  });
  return cardClone;
};