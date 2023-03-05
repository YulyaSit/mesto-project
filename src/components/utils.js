import { profileName, profileProfession, cardsMain, nameInput, jobInput,popupEditProfile, linkImageInput, nameImageInput, popupAdd } from "../index.js";
import { closePopup } from "../components/modal.js";
import { createCards } from "../components/card.js";
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

//функция для создания новой карточки через попап
function handleFormSubmitAdd(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    cardsMain.prepend(createCards(linkImageInput.value, nameImageInput.value))
    closePopup(popupAdd);
    evt.target.reset()//очищает инпуты после добавления картинки
}

function disabledButton (selectors, disabledButtonAdd) {
    disabledButtonAdd.disabled = true; //свойство disabled для отключения кнопки
    disabledButtonAdd.classList.add(selectors.inactiveButtonClass); //сделай кнопку неактивной
  };

export {handleFormSubmitAdd, handleProfileFormSubmit, disabledButton};