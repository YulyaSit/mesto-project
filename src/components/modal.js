import { closePopup } from "./utils.js";

function handleEscape(evt) { //создали функцию для обработчика с условием при нажатии на кнопку ESC
  if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
    const openedPopup = document.querySelectorAll('.popup_opened');
    openedPopup.forEach(item => { closePopup(item) });
  };
};

export { handleEscape }
