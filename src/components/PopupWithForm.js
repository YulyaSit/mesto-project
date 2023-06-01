import Popup from "./Popup.js"
import { openPopupCard, openPopupEdit, openPopupAvatar } from "../index.js"
import { buttonOpenPopupProfile, buttonAddCard, avatarEditProfile} from "./constants.js"
export default class PopupWithForm extends Popup {
    constructor(popup, { callback }) {
        super(popup);
        this._callback = callback;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.elements);
        this._button = this._form.querySelector('.popup__button').value
    }

    _getInputValues() {
        const inputValues = {};

        this._inputList.forEach((input) => {
            if(input.type !== 'submit') {
                inputValues[input.type] = input.value;
            }
        })

        return inputValues;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
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