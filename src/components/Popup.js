import { closeButtons, popups } from "./constants"
export default class Popup {
    constructor(popup) {
        this.popup = popup
    }
    open(popup) {
        popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
    }
    close(popup) {
        popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
        }
   _handleEscClose(evt) {
        if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
            const openedPopup = document.querySelector('.popup_opened');
            this.close(openedPopup);
          };
    }
    setEventListeners(evt) {
        closeButtons.forEach((button) => { //закрытие попапов на крестик
            // находим 1 раз ближайший к крестику попап 
            const popup = button.closest('.popup');
            // устанавливаем обработчик закрытия на крестик
            button.addEventListener('click', () => this.close(popup));
          });
          popups.forEach(popup => { //закрытие на все попапы при клике мышки на оверлей
            popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')) {
                this.close(popup);
              };
            })
          });
    }
}

/*if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };*/