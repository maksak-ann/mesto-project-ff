// CSS
import "../pages/index.css";

// Imports
import {
    createCard,
    updateCardLikes,
} from "./card";
import {
    openPopup,
    closePopup,
    clickOnOverlay,
} from "./modal"
import {enableValidation} from "./validation";
import {get, config, put, apiDelete, patch, post} from "./api";
import {authId, setProfileData} from "./profile";

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

const startLoading = (form, btnSelector = '.popup__button') => {
    const button = form.querySelector(btnSelector)
    button.textContent = 'Сохранение...'
}
const finishLoading = (form, btnSelector = '.popup__button') => {
    const button = form.querySelector(btnSelector)
    button.textContent = 'Сохранить'
}

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
    startLoading(formEditProfile)

    if (!name.value.length || !description.value.length) {
        return
    }

    patch(`${config.baseUrl}/users/me`, {
        name: name.value,
        about: description.value
    }).then(res => {
        setProfileData(res)
        closePopup(popupEditProfile)
    }).catch(err => {
        console.log('Error: ', err)
    })
        .finally(() => {
            finishLoading(formEditProfile)
        })
});

// EditAvatar Popup
const popupEditAvatar = document.querySelector('.popup_type_avatar')
const buttonOpenPopupEditAvatar = document.querySelector('.profile__image-edit')

const formEditAvatar = document.forms['profile-image']
formEditAvatar.addEventListener('submit', function (evt) {
    // отменим стандартное поведение
    evt.preventDefault();

    // проверяем данные пользователя
    const link = formEditAvatar.elements.link

    startLoading(formEditAvatar)

    if (!link.value.length) {
        return
    }

    patch(`${config.baseUrl}/users/me/avatar`, {
        avatar: link.value
    }).then(res => {
        setProfileData(res)
        closePopup(popupEditAvatar)
    }).catch(err => {
        console.log('Error: ', err)
    })
        .finally(() => {
            finishLoading(formEditAvatar)
        })
});
buttonOpenPopupEditAvatar.addEventListener('click', () => {
    openPopup(popupEditAvatar)
})

// formPlaceName Popup
// Открыть попап
const popupFormPlaceName = document.querySelector('.popup_type_new-card')
const buttonOpenPopupForm = document.querySelector('.profile__add-button')

const formPlaceName = document.forms['new-place'];

buttonOpenPopupForm.addEventListener('click', () => {
    openPopup(popupFormPlaceName)
})

function like(cardElement, id) {
    put(`${config.baseUrl}/cards/likes/${id}`)
        .then(res => {
            updateCardLikes(cardElement, res)
        })
}

function dislike(cardElement, id) {
    apiDelete(`${config.baseUrl}/cards/likes/${id}`)
        .then(res => {
            updateCardLikes(cardElement, res)
        })
}

const likeCard = (cardElement, id) => {
    const likeElement = cardElement.querySelector('.card__like-button')
    if (!likeElement.classList.contains('card__like-button_is-active')) {
        like(cardElement, id)
    } else {
        dislike(cardElement, id)
    }
}

const deleteCard = (cardElement, id) => {
    apiDelete(`${config.baseUrl}/cards/${id}`)
        .then(res => {
            cardElement.remove()
        })
}

formPlaceName.addEventListener('submit', function (evt) {
    // отменим стандартное поведение
    evt.preventDefault();

    // проверяем данные пользователя
    const placeName = formPlaceName.elements['place-name']
    const link = formPlaceName.elements.link
    if (!placeName.value.length || !link.value.length) {
        return
    }

    startLoading(formPlaceName)

    post(`${config.baseUrl}/cards`, {
        name: placeName.value,
        link: link.value,
    }).then(res => {
        cardsList.prepend(createCard(res, authId, deleteCard, likeCard, handleImageClick));
    }).catch(err => {
        console.log('Error: ', err)
    })
        .finally(() => {
            finishLoading(formPlaceName)
        })

    closePopup(popupFormPlaceName)
    formPlaceName.reset()
});

// Создание карточек
const cardsList = document.querySelector(".places__list");
Promise.all([
    get(`${config.baseUrl}/users/me`),
    get(`${config.baseUrl}/cards`),
]).then(([userData, cardsArray]) => {
    // Загрузка профиля
    setProfileData(userData)
    cardsArray.forEach((cardItem) => {
        cardsList.append(createCard(cardItem, authId, deleteCard, likeCard, handleImageClick));
    })
})

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
})
