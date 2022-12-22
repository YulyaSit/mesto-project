//находим элементы
const editButton = document.querySelector('.profile__button-edit')  //кнопка редактирования профиля
const popup = document.querySelector('.popup')  //попап
const closeButton = document.querySelector('.popup__button-close')   //кнопка закрытия попапа
const addButton = document.querySelector('.profile__button-add')  //кнопка добавления карточки
const popupAdd = document.querySelector('#popup-add')  //попап добавления карточки
const closeAdd = document.querySelector('#popup__add-close')  //кнопка закрытия попапа с добавлением карточки

function openPopup(popup) {   //создаем универсальную функцию открытия попапа
  popup.classList.add('popup_opened'); //добавляем класс чтобы он срабатывал при открытии попапа
}

function closePopup(popup) { //универсальная функция закрытия попапа
  popup.classList.remove('popup_opened'); //удаление класса со свойством display:flex
}

editButton.addEventListener('click', function() { //навешиваем слушатель, при клике на кнопку редактирования профиля срабатывает универсальная функция открытия попапа
  openPopup(popup);
  nameInput.value = profileName.textContent; //привязываем к полям ввода текста значения, которые будут при активных значениях
  jobInput.value = profileProfession.textContent; // -//-//-
})

closeButton.addEventListener('click', function() { //слушатель на кнопку закрытия попапа
  closePopup(popup);
}) 

addButton.addEventListener('click', function(){ //слушатель на кнопку открытия попапа добавления карточки
  openPopup(popupAdd)
})

closeAdd.addEventListener('click', function(){
  closePopup(popupAdd) ; //слушатель для закрытия попапа добавления
});

const initialCards = [
    {
      name: 'Рыбов мне!',
      link: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Когда покодил',
      link: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
    },
    {
      name: 'Релакс',
      link: 'https://images.unsplash.com/photo-1572252821143-035a024857ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
    },
    {
      name: 'А можно ненадо?',
      link: 'https://images.unsplash.com/photo-1570824105192-a7bb72b73141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=842&q=80'
    },
    {
      name: 'С нг кароч',
      link: 'https://images.unsplash.com/photo-1542108226-9130e1e83cc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80'
    },
    {
      name: 'И что ты мне сделаешь?',
      link: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80'
    }
  ]; //массив по ТЗ
  
const cardsMain = document.querySelector('.cards'); //общий контейнер карточек
  
const templateCard = document.querySelector('#template-card').content; //создали элемент теплейта с содержимым карточки 
const popupPicture = document.querySelector('#popup-picture') //попап для открытия картинок
const closePicture = popupPicture.querySelector('.popup__image-close') //кнопка закрытия попапа с картинкой
const popupImage = popupPicture.querySelector('.popup__image') //картинка в попапе
const popupCaption = popupPicture.querySelector('.popup__text') //надпись в попапе
  

//функция которая будет изменять содержимое клонированной из темплейта карточки, в ней мы присваиваем значения из массива, добавляет лайк, активируем урну с удалением карточки, так же привязываем
//так же присваиваем значения к попапам для картинок
  function createCards  (link, name) {
  const cardClone = templateCard.querySelector('.card').cloneNode(true);
    cardClone.querySelector('.card__image').src = link;
    cardClone.querySelector('.card__image').alt = name;
    cardClone.querySelector('.card__name').textContent = name;
    cardClone.querySelector('.card__button-like').addEventListener('click', function(evt){
        evt.target.classList.toggle('card__button-like_active')
      })
   cardClone.querySelector('.button__urn').addEventListener('click', function(){
   const deleteCard = cardClone.closest('.card');
   deleteCard.remove();
    });
    cardClone.querySelector('.card__image').addEventListener('click',function() {
      popupImage.src = link
      popupImage.alt = name
      popupCaption.textContent = cardClone.textContent
      openPopup(popupPicture)
    })

    return cardClone;
  }
//чтобы карточки приняли новые значения, мы делаем перебор с помощью метода forEach и вставляем новые карточки в общий контейнер
initialCards.forEach(function(item){
    cardsMain.append(createCards(item.link, item.name));
})




// Находим форму в DOM
const formElement = document.querySelector('.popup__container_edit')
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__name_firstname');
const jobInput = formElement.querySelector('.popup__name_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.value
    jobInput.value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

const submitButton = formElement.querySelector('.popup__button');

submitButton.addEventListener('click', function(){
  closePopup(popup);
});

// Находим форму в DOM
const formElementAdd = document.querySelector('.popup__container_add')
// Находим поля формы в DOM
const nameImageInput = popupAdd.querySelector('.popup__name_image');
const linkImageInput = popupAdd.querySelector('.popup__name_link');
//функция для создания новой карточки через попап
function handleFormSubmitAdd(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    cardsMain.prepend(createCards(linkImageInput.value, nameImageInput.value))
}
formElementAdd.addEventListener('submit', handleFormSubmitAdd); 

const submitButtonAdd = formElementAdd.querySelector('.popup__button_create'); //кнопка сохранить в попапе "новое место"

submitButtonAdd.addEventListener('click', function(){ //слушатель для кнопки "сохранить"
  closePopup(popupAdd);
});

    
closePicture.addEventListener('click', function(){ //закрытие попапа с картинкой
  closePopup(popupPicture)
})