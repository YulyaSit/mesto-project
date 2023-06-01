import { closeButtons, popups } from "./constants"
export default class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
    }

    open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt))
    }

   _handleEscClose(evt) {
        if (evt.key === 'Escape') { 
          this.close();
          };
    }

    setEventListeners() {
        closeButtons.forEach((button) => { 
             button.addEventListener('click', () => this.close());
           });
           popups.forEach(popup => { //закрытие на все попапы при клике мышки на оверлей
             popup.addEventListener('mousedown', (evt) => {
             if (evt.target.classList.contains('popup_opened')) {
                 this.close();
               };
             })
           });
    }
}