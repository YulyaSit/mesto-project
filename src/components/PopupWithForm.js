import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
    constructor(popup, { callback }) {
        super(popup);
        this._callback = callback;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.elements);
        this._buttonValue = this._form.querySelector('.popup__button')
        this._buttonValueText = this._buttonValue.value
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
    renderLoading(isLoading, isLoadingText = 'Сохранение...') {
        if (isLoading) {
            this._buttonValue.value = isLoadingText
        } else {
            this._buttonValue.value = this._buttonValueText
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