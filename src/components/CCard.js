import { api } from "..";
import { popupCaption, popupImage, popupPicture, userInfo } from "./constants";
import { popupWithImage,popup } from "../index.js";
export default class Card {
    constructor(card, selector) {
        this._card = card;
        this._likes = card.likes;
        this._link = card.link;
        this._name = card.name;
        this._id = card._id;
        this._userInfo = userInfo;
        this._selector = selector;
    }

    _getElement() {
        const cardClone = document
          .querySelector(this._selector)
          .content
          .querySelector('.card')
          .cloneNode(true);

        return cardClone;
      }
      _setLike(evt, element) {
        const userLikes = element.querySelector('.card__likes');

        if (!evt.target.classList.contains('card__button-like_active')) {  
          api.pasteLike(this._id)  
            .then((card) => {
              evt.target.classList.add('card__button-like_active');
              userLikes.textContent = card.likes.length; 
            })
            .catch((err) => {
              console.log(err); 
            });
        } else {
          api.deleteLike(this._id) 
            .then((card) => {
              evt.target.classList.remove('card__button-like_active');
              userLikes.textContent = card.likes.length;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      _deleteCard(element) {
        api.deleteCard(this._card)
        .then((card) => {
          card._id = element.remove()
        })
        .catch((err) => {
          console.log(err); 
        });
      }

      _setEventListeners(element) {
        const cardImage = element.querySelector('.card__image');
        const cardButtonLike = element.querySelector('.card__button-like')
        const cardUrn = element.querySelector('.button__urn');
        
        cardImage.addEventListener('click', () => {
          popupWithImage.open(this._link, this._name)
        })

        cardButtonLike.addEventListener('click', (evt) => {
          this._setLike(evt, element);
        });
        
        cardUrn.addEventListener('click', () => { this._deleteCard(element)});
      }

      generate() {
        this._element = this._getElement();

        const userLikes = this._element.querySelector('.card__likes');
        const cardImage = this._element.querySelector('.card__image');
        const cardUrn = this._element.querySelector('.button__urn');
        const cardButtonLike = this._element.querySelector('.card__button-like')

        this._element.querySelector('.card__name').textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        userLikes.textContent = this._likes.length;

        if (this._userInfo.id === this._card.owner._id) { //условие чтобы урна была только на моих карточках
          cardUrn.classList.add('button__urn_active')
        }

        this._likes.forEach((like) => {
          if (like._id === this._userInfo.id) {
            cardButtonLike.classList.add('card__button-like_active')
          }
        });

        this._setEventListeners(this._element);

        return this._element;
      }
}