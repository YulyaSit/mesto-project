import { popupCaption, popupImage, popupPicture} from "./constants";
import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
    }
    open(link, name) {
        popupImage.src = link;
        popupCaption.textContent = name;
        super.open(popupPicture)
    }
}