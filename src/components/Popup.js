
export default class Popup {
    constructor(popup) {
        this._popup = popup
    }
    open(popup) {
        popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose())
    }
    close(popup) {
        popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose());
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
            this.close(this._popup);
          };
    }
    setEventListeners() {
        const closeButton = document.querySelector('.popup__button-close')
        closeButton.addEventListener('click', () => {
            this.close(this._popup)
        })
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
              this.close(this._popup);
            };
          })
    }
}