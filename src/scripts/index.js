// CSS
import "../pages/index.css";

// Imports
import {
    initialCards,
} from "./cards";
import {
    createCard,
    deleteCard,
    likeCard
} from "./card";
import {
    openPopup,
    closePopup,
    clickOnOverlay,
} from "./modal"
import {enableValidation} from "./validation";

// Общее для попапов
// Клик по оверлэю
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        clickOnOverlay(event.target)
    })
})

// Клик по кнопке "закрыть попап"
const closeButtons = document.querySelectorAll('.popup__close')
closeButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup_is-opened')
        closePopup(popup)
    })
})

// Lightbox popup
const popupLightbox = document.querySelector(('.popup_type_image'))
const imageLightbox = popupLightbox.querySelector('img')
const captionLightbox = popupLightbox.querySelector('.popup__caption')
const setLightboxImage = (img) => {
    imageLightbox.src = img.src
    imageLightbox.alt = img.alt
    captionLightbox.textContent = img.alt
}
const handleImageClick = (image) => {
    setLightboxImage(image)
    openPopup(popupLightbox)
}

// EditProfile Popup
const popupEditProfile = document.querySelector('.popup_type_edit')
const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button')
const inputName = popupEditProfile.querySelector('.popup__input_type_name')
const inputDescription = popupEditProfile.querySelector('.popup__input_type_description')

const wrapper = document.querySelector('.profile__info')
const labelName = wrapper.querySelector('.profile__title')
const labelDescription = wrapper.querySelector('.profile__description')

const formEditProfile = document.forms['edit-profile']

buttonOpenPopupEditProfile.addEventListener('click', () => {
    inputName.value = labelName.textContent
    inputDescription.value = labelDescription.textContent
    openPopup(popupEditProfile)
})

formEditProfile.addEventListener('submit', function (evt) {
    // отменим стандартное поведение
    evt.preventDefault();

    // проверяем данные пользователя
    const name = formEditProfile.elements.name
    const description = formEditProfile.elements.description

    if (!name.value.length || !description.value.length) {
        return
    }

    labelName.textContent = name.value
    labelDescription.textContent = description.value

    closePopup(popupEditProfile)
});

// formPlaceName Popup
// Открыть попап
const popupFormPlaceName = document.querySelector('.popup_type_new-card')
const buttonOpenPopupForm = document.querySelector('.profile__add-button')

const formPlaceName = document.forms['new-place'];

buttonOpenPopupForm.addEventListener('click', () => {
    openPopup(popupFormPlaceName)
})

formPlaceName.addEventListener('submit', function (evt) {
    // отменим стандартное поведение
    evt.preventDefault();

    // проверяем данные пользователя
    const placeName = formPlaceName.elements['place-name']
    const link = formPlaceName.elements.link
    if (!placeName.value.length || !link.value.length) {
        return
    }

    cardsList.prepend(createCard({
        name: placeName.value,
        link: link.value,
    }, deleteCard, likeCard, handleImageClick));

    closePopup(popupFormPlaceName)
    formPlaceName.reset()
});

// Создание карточек
const cardsList = document.querySelector(".places__list");
initialCards.forEach((cardItem) => {
    cardsList.append(createCard(cardItem, deleteCard, likeCard, handleImageClick));
});

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
})
