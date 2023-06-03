class UserInfo {
    // теперь все данные пользователя устанавливаются тут, включая аватар
    constructor({ nameSelector, jobSelector, avatarSelector, idSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this.jobElement = document.querySelector(jobSelector);
      this._avatarElement = document.querySelector(avatarSelector);
      this._userId = document.querySelector(idSelector).id;
    }

    // метод getUserInfo должен возвращать данные из профиля, взяв их из `textContent`.
    getUserInfo = () => {
      return {
        name: this._nameElement.textContent,
        about: this.jobElement.textContent,
        userId: this._userId,  // _id тоже можно тут получать, чтобы испольозовать в `index.js` для создания карточек
      };
    };
    // метод `setUserInfo` должен получать в вызов все данные пользователя и устанавливать их внутри
    setUserInfo({ name, about, avatar, _id }) {
      this._nameElement.textContent = name;
      this.jobElement.textContent = about;
      this._avatarElement.src = avatar;
      this._userId = _id;
    }
  }