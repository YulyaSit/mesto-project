import { formValidator } from "../index.js";
//функция которая добавляет класс с ошибкой
export default class FormValidator {
  constructor(selectors, formSelector = '.form') {
    this._selectors = selectors
    this._form = formSelector
  }
_showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._selectors.inputErrorClass); // при невалидности добавляет класс красного бордера
  errorElement.textContent = errorMessage; //чтобы не писать текст ошибки в спане, мы воспользовались свойством errorMessage
  errorElement.classList.add(this._selectors.errorClass); // при невалидности добавляет текст ошибки
};

//функция которая удаляет класс с ошибкой
_hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._selectors.inputErrorClass); //удаляет класс при валидности
  errorElement.classList.remove(this._selectors.errorClass); // -//-//-
  errorElement.textContent = ""; //очищаем поле при валидости
};

//функция которая проверяет валидность поля
_isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); //берем текст ошибки из разметки
  } else {
    inputElement.setCustomValidity("");
  };

  if (!inputElement.validity.valid) { //если инпут не проходит валидацию
   _showInputError(formElement, inputElement, inputElement.validationMessage, this._selectors); //вызываем функцию, которая добавляет класс с ошибкой инпуту (стилизация бордера) и validationMessage(встроенные в браузер сообщения об ошибке);
  } else { //если инпут проходит валидацию
    _hideInputError(formElement, inputElement, this._selectors); // вызывать функцию, которая скрывает класс с ошибкой инпуту (стилизация бордера);
  };
};


// функция которая проверяет не одно поле, а массив полей сразу при невалидности хотя бы одного поля
_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => { //проходим по массиву методом some
    return !inputElement.validity.valid; //если поле не валидно колбек вернет true  и функция остановится с окончательным булевым значением true
  });
};


//функция для стилизации вкл/выкл кнопки submit
_toggleButtonState (inputList, buttonElement) { //принимает массив полей и кнопку submit
  if (_hasInvalidInput(inputList, this._selectors)) { // если хотя бы один инпут невалиден
    buttonElement.disabled = true; //свойство disabled для отключения кнопки
    buttonElement.classList.add(this._selectors.inactiveButtonClass); //сделай кнопку неактивной
  } else {
    buttonElement.disabled = false; //иначе сделай кнопку активной
    buttonElement.classList.remove(this._selectors.inactiveButtonClass);
  };
};

//функция которая перебирает все элементы в форме
_setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this._selectors.inputSelector)) //находим все поля формы, из псевдомассива преобразуем в массив методом Array.from
  const buttonElement = formElement.querySelector(this._selectors.submitButtonSelector);
  _toggleButtonState(inputList, buttonElement, this._selectors); //вызываем функцию в обработчике инпута (передаем поля и кнопку)
  formElement.addEventListener('reset', () => { //слушатель для деактивации кнопки
    setTimeout(() => {// `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      _toggleButtonState(inputList, buttonElement, this._selectors);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });
  inputList.forEach((inputElement) => { //обходим поля массивом
    inputElement.addEventListener('input', () => { //каждому полю добавляем обработчик событий input
      _isValid(formElement, inputElement, this._selectors); //в колбеке вызываем функицю isValid и передаем ей форму и элементы в форме
      _toggleButtonState(inputList, buttonElement, this._selectors); //вызываем функцию в обработчике инпута (передаем поля и кнопку)
    });
  });
};

//функция которая перебирает все формы на странице
enableValidation() {
  const formList = Array.from(document.querySelectorAll(this._form)); //находим все поля формы и делаем из них массив
  formList.forEach((formElement) => { //делаем перебор всех форм в разметке
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    }) //отменяем стандартное поведение
    _setEventListeners(formElement, this._selectors); //вызываем на каждую форму функцию
  });
};
}