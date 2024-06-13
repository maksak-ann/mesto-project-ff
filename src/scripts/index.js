// CSS
import "../pages/index.css";

// Imports
import {
    initialCards,
    createCard,
    deleteCard,
    likeCard
} from "./cards";
import {
    handleOpenPopupButtonClick,
    handleClosePopupButtonClick, openPopup, closePopup,
} from "./modal"

// @todo: DOM узлы
const cardsLst = document.querySelector(".places__list");
initialCards.forEach((cardItem) => {
    cardsLst.append(createCard(cardItem, deleteCard, likeCard));
});

// Открыть попап
const buttons = document.querySelectorAll('[data-popup-target]')
buttons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        handleOpenPopupButtonClick(event.target)
    })
})

// Закрыть попап
const closeButtons = document.querySelectorAll('.popup__close')
closeButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        handleClosePopupButtonClick(event.target)
    })
})

const editButtons = document.querySelectorAll('.profile__edit-button')
editButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        handleEditFormButtonClick(event.target)
    })
})

const wrapper = document.querySelector('.profile__info')
const nameLabel = wrapper.querySelector('.profile__title')
const descriptionLabel = wrapper.querySelector('.profile__description')
const handleEditFormButtonClick = () => {
    const popup = document.querySelector('.popup_type_edit')
    popup.querySelector('.popup__input_type_name').value = nameLabel.textContent
    popup.querySelector('.popup__input_type_description').value = descriptionLabel.textContent
    openPopup(popup)
}

const profileForm = document.forms['edit-profile']; // получаем форму
profileForm.addEventListener('submit', function (evt) {
    // отменим стандартное поведение
    evt.preventDefault();

    // проверяем данные пользователя
    const name = profileForm.elements.name
    const description = profileForm.elements.description

    if (!name.value.length || !description.value.length) {
        return
    }

    nameLabel.textContent = name.value
    descriptionLabel.textContent = description.value

    const popup = document.querySelector('.popup_is-opened')
    closePopup(popup)
});

const cardForm = document.forms['new-place']; // получаем форму
// вешаем на неё обработчик события submit
cardForm.addEventListener('submit', function (evt) {
    // отменим стандартное поведение
    evt.preventDefault();

    // проверяем данные пользователя
    const placeName = cardForm.elements['place-name']
    const link = cardForm.elements.link
    if (!placeName.value.length || !link.value.length) {
        return
    }

    cardsLst.prepend(createCard({
        name: placeName.value,
        link: link.value,
    }, deleteCard, likeCard));

    const popup = document.querySelector('.popup_is-opened')
    closePopup(popup)
});