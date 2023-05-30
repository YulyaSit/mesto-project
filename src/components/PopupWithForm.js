import { formAvatar, popupAvatar ,profileAvatar} from "./constants"
export default class PopupWithForm extends Popup {
    constructor(popup, callback){
        super(popup)
        this._callback = callback
    }
  }