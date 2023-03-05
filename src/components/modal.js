  import { popupEditProfile, popupAdd, popupPicture } from "../index.js";
  
  function openPopup(popup) {   //создаем универсальную функцию открытия попапа
    popup.classList.add('popup_opened'); //добавляем класс чтобы он срабатывал при открытии попапа
  };
  
  function closePopup(popup) { //универсальная функция закрытия попапа
    popup.classList.remove('popup_opened'); //удаление класса со свойством display:flex
  };

  function keyHandler(evt) { //создали функцию для обработчика с условием при нажатии на кнопку ESC
    if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
      closePopup(popupEditProfile);
      closePopup(popupAdd);
      closePopup(popupPicture);
    };
  };

  export {openPopup, closePopup, keyHandler}
  