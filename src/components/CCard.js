import { api } from "..";
import { popupCaption, popupImage, popupPicture } from "./constants";

export default class Card {
    constructor(card, userInfo, selector) {
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
      
      _handleOpenPopup() {
        popupImage.src = this._link;
        popupCaption.textContent = this._name;
        popupPicture.classList.add('popup_opened');
      }
    
      _handleClosePopup() {
        popupImage.src = '';
        popupPicture.classList.remove('popup_is-opened');
      }

      _setLike(evt) {
        this._element = this._getElement();
        const userLikes = this._element.querySelector('.card__likes');

        if (!evt.target.classList.contains('card__button-like_active')) {  
          api.pasteLike(this._id)  
            .then((card) => {
              evt.target.classList.add('card__button-like_active') 
              userLikes.textContent = card.likes.length; 
            })
            .catch((err) => {
              console.log(err); 
            });
        } else {
          api.deleteLike(this._id) 
            .then((card) => {
              evt.target.classList.remove('card__button-like_active') 
              userLikes.textContent = card.likes.length 
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

      _setEventListeners() {
        this._element = this._getElement();

        const cardImage = this._element.querySelector('.card__image');
        const cardButtonLike = this._element.querySelector('.card__button-like')
        const cardUrn = this._element.querySelector('.button__urn');
        
        cardImage.addEventListener('click', () => {
          this._handleOpenPopup();
          } 
        )

        cardButtonLike.addEventListener('click', this._setLike);
        
        cardUrn.addEventListener('click', this._deleteCard(this._element));
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

        if (userInfo.id === this._card.owner._id) { //условие чтобы урна была только на моих карточках
          cardUrn.classList.add('button__urn_active')
        }

        this._likes.forEach((like) => {
          if (like._id === this._userInfo.id) {
            cardButtonLike.classList.add('card__button-like_active')
          }
        });

        return this._element;
      }
}