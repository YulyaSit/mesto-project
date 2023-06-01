import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popup, { callback }) {
        super(popup);
        this._callback = callback;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.elements);
        this._inputValues = {};
    }

    _getInputValues() {
        this._inputList.forEach((input) => {
            if(input.type !== 'submit') {
                this._inputValues[input.type] = input.value;
            }
        })

        return this._inputValues;
    }

    setInputValues() {
        this._inputValues = this._getInputValues();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.setInputValues();
            this._callback(this._inputValues);
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