import { handleEscape } from "./modal.js";
function openPopup(popup) {   //создаем универсальную функцию открытия попапа
    popup.classList.add('popup_opened'); //добавляем класс чтобы он срабатывал при открытии попапа
    document.addEventListener('keydown', handleEscape); //навесили на весь документ html слушатель нажатия кнопки и функции с условием
};

function closePopup(popup) { //универсальная функция закрытия попапа
    popup.classList.remove('popup_opened'); //удаление класса со свойством display:flex
    document.removeEventListener('keydown', handleEscape); //навесили на весь документ html слушатель нажатия кнопки и функции с условием
};

export { closePopup, openPopup };