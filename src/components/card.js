import { templateCard, popupImage, popupCaption, popupPicture } from "../index.js";
import { openPopup } from "../components/utils.js";
//функция которая будет изменять содержимое клонированной из темплейта карточки, в ней мы присваиваем значения из массива, добавляет лайк, активируем урну с удалением карточки, так же привязываем
//так же присваиваем значения к попапам для картинок
export function createCard(link, name) {
  const cardClone = templateCard.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image')
  cardImage.src = link;
  cardImage.alt = name;
  cardClone.querySelector('.card__name').textContent = name;
  cardClone.querySelector('.button__urn').addEventListener('click', function () {
    cardClone.remove();
  });
  cardClone.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__button-like')) {
      evt.target.classList.toggle('card__button-like_active');
    };
  });
  cardImage.addEventListener('click', function () {
    popupImage.src = link
    popupImage.alt = name
    popupCaption.textContent = cardClone.textContent
    openPopup(popupPicture)
  });
  return cardClone;
};