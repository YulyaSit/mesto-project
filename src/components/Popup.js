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
        closeButtons.forEach((button) => { //закрытие попапов на крестик
             // находим 1 раз ближайший к крестику попап 
             const popup = button.closest('.popup');
             // устанавливаем обработчик закрытия на крестик
             button.addEventListener('click', () => this.close());
           });
           popups.forEach(popup => { //закрытие на все попапы при клике мышки на оверлей
             popup.addEventListener('mousedown', (evt) => {
             if (evt.target.classList.contains('popup_opened')) {
                 this.close();
               };
             })
           });
        /*this._popup.addEventListener('click', (evt) => {
          const elem = evt.target;

          if(elem.classList.contains('popup') || elem.classList.contains('popup__button-close')) {
            this.close();
          }
        })*/
    }
}

/*if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };*/