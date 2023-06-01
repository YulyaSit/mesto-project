import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(popup, { callback }) {
        super(popup);
        this._callback = callback;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.elements);
        this._button = this._form.querySelector('.popup__button')
    }

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach((input) => {
            if (input.type !== 'submit') {
                inputValues[input.name] = input.value;
            }
        })

        return inputValues;
    }
    renderLoading(isLoading) {
        const buttonLoading = 'Сохранение..'
        const buttonText = 'Сохранить' //универсальная функция для загрузки
        if (isLoading) {
            this._button.value = buttonLoading
        } else {
            this._button.value = buttonText
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true)
            this._callback(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    print() {
        console.log(this._getInputValues());
    }
}