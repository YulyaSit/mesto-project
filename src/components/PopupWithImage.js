import { popupCaption, popupImage } from "../utils/constants.js";
import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupCaption = this._popup.querySelector('.popup__text');
        this._popupImage = this._popup.querySelector('.popup__image');
    }
    open(link, name) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
    }
}