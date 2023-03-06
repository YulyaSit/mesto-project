import { selectors } from "../index.js";

//функция которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass); // при невалидности добавляет класс красного бордера
  errorElement.textContent = errorMessage; //чтобы не писать текст ошибки в спане, мы воспользовались свойством errorMessage
  errorElement.classList.add(selectors.errorClass); // при невалидности добавляет текст ошибки
};

//функция которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass); //удаляет класс при валидности
  errorElement.classList.remove(selectors.errorClass); // -//-//-
  errorElement.textContent = ""; //очищаем поле при валидости
};

//функция которая проверяет валидность поля
const isValid = (formElement, inputElement, selectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); //берем текст ошибки из разметки
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) { //если инпут не проходит валидацию
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors); //вызываем функцию, которая добавляет класс с ошибкой инпуту (стилизация бордера) и validationMessage(встроенные в браузер сообщения об ошибке);
  } else { //если инпут проходит валидацию
    hideInputError(formElement, inputElement, selectors); // вызывать функцию, которая скрывает класс с ошибкой инпуту (стилизация бордера);
  };
};


// функция которая проверяет не одно поле, а массив полей сразу при невалидности хотя бы одного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { //проходим по массиву методом some
    return !inputElement.validity.valid; //если поле не валидно колбек вернет true  и функция остановится с окончательным булевым значением true
  });
};


//функция для стилизации вкл/выкл кнопки submit
const toggleButtonState = (inputList, buttonElement, selectors) => { //принимает массив полей и кнопку submit
  if (hasInvalidInput(inputList, selectors)) { // если хотя бы один инпут невалиден
    buttonElement.disabled = true; //свойство disabled для отключения кнопки
    buttonElement.classList.add(selectors.inactiveButtonClass); //сделай кнопку неактивной
  } else {
    buttonElement.disabled = false; //иначе сделай кнопку активной
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  };
};

//функция которая перебирает все элементы в форме
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector)) //находим все поля формы, из псевдомассива преобразуем в массив методом Array.from
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors); //вызываем функцию в обработчике инпута (передаем поля и кнопку)
  formElement.addEventListener('reset', () => { //слушатель для деактивации кнопки
    setTimeout(() => {// `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      toggleButtonState(inputList, buttonElement, selectors);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });
  inputList.forEach((inputElement) => { //обходим поля массивом
    inputElement.addEventListener('input', () => { //каждому полю добавляем обработчик событий input
      isValid(formElement, inputElement, selectors); //в колбеке вызываем функицю isValid и передаем ей форму и элементы в форме
      toggleButtonState(inputList, buttonElement, selectors); //вызываем функцию в обработчике инпута (передаем поля и кнопку)
    });
  });
};

//функция которая перебирает все формы на странице
export const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector)); //находим все поля формы и делаем из них массив
  formList.forEach((formElement) => { //делаем перебор всех форм в разметке
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    }) //отменяем стандартное поведение
    setEventListeners(formElement, selectors); //вызываем на каждую форму функцию
  });
};