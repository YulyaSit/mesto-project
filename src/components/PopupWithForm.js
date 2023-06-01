import Popup from "./Popup.js"
import { openPopupCard, openPopupEdit, openPopupAvatar } from "../index.js"
import { buttonOpenPopupProfile, buttonAddCard, avatarEditProfile} from "./constants.js"
export default class PopupWithForm extends Popup {
    constructor(popup){
        super(popup)
    }
    open() {
        super.open()
    }
    setEventListeners() {
        super.setEventListeners()
    }
  }