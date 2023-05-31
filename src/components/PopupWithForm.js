import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popup){
        super(popup);
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        const values = this._form.elements;

        return values;
    }

    close() {
        super.close();
        this._form.reset();
    }

    print() {
        const inputList = this._form.elements;

        console.log(inputList[0].value)
    }
  }