export default class Card {
  constructor(card, selector, api, { handleCardClick }) {
    this._card = card;
    this._likes = card.likes;
    this._link = card.link;
    this._name = card.name;
    this._id = card._id;
    this._userInfo = document.querySelector('.container');
    this._selector = selector;
    this._api = api;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardClone = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardClone;
  }
  _setLike(evt) {
    if (!evt.target.classList.contains('card__button-like_active')) {
      this._api.pasteLike(this._id)
        .then((card) => {
          evt.target.classList.add('card__button-like_active');
          this._userLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api.deleteLike(this._id)
        .then((card) => {
          evt.target.classList.remove('card__button-like_active');
          this._userLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _deleteCard() {
    this._api.deleteCard(this._card)
      .then((card) => {
        card._id = this._element.remove()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', this._handleCardClick)

    this._cardButtonLike.addEventListener('click', (evt) => {
      this._setLike(evt);
    });

    this._cardUrn.addEventListener('click', () => { this._deleteCard() });
  }

  generate() {
    this._element = this._getElement();

    this._userLikes = this._element.querySelector('.card__likes');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardUrn = this._element.querySelector('.button__urn');
    this._cardButtonLike = this._element.querySelector('.card__button-like')

    this._element.querySelector('.card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._userLikes.textContent = this._likes.length;

    if (this._userInfo.id === this._card.owner._id) { //условие чтобы урна была только на моих карточках
      this._cardUrn.classList.add('button__urn_active')
    }

    this._likes.forEach((like) => {
      if (like._id === this._userInfo.id) {
        this._cardButtonLike.classList.add('card__button-like_active')
      }
    });

    this._setEventListeners();

    return this._element;
  }
}