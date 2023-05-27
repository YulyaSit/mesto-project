/*function handleEscape(evt) { //создали функцию для обработчика с условием при нажатии на кнопку ESC
  if (evt.key === 'Escape') { //условие если пользователь нажмет на ескейп то вызовутся функции закрытия попапа  
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function openPopup(popup) {   //создаем универсальную функцию открытия попапа
  popup.classList.add('popup_opened'); //добавляем класс чтобы он срабатывал при открытии попапа
  document.addEventListener('keydown', handleEscape); //навесили на весь документ html слушатель нажатия кнопки и функции с условием
};

function closePopup(popup) { //универсальная функция закрытия попапа
  popup.classList.remove('popup_opened'); //удаление класса со свойством display:flex
  document.removeEventListener('keydown', handleEscape); //навесили на весь документ html слушатель нажатия кнопки и функции с условием
};

export {openPopup, closePopup}*/