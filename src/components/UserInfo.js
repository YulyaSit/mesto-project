import { api } from "..";

export default class UserInfoo {
    constructor( { profileName, profileProfession }) {
        this._profileName = document.querySelector(profileName);
        this._profileProfession = document.querySelector(profileProfession);
    }

    getUserInfo() {
          return api.getEditProfile()
          .then((user) => {
            return user;
          })
          .catch((err) => {
            console.log(err);
          })
    }

    setUserInfo(nameInput, jobInput) {
        api.patchEditProfile(nameInput, jobInput) //фетч для изменения данных о пользователе: имя и профессия
        .then(data => {
            this._profileName.textContent = data.name;
            this._profileProfession.textContent = data.about;
        })
        .catch((err) => {
          console.log(err)
        })
    }
}