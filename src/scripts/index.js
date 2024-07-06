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
import {clearValidation, enableValidation} from "./validation";
import * as api from "./api";

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const profileElement = document.querySelector('.profile__info')
const profileImageElement = document.querySelector('.profile__image')
const profileNameElement = profileElement.querySelector('.profile__title')
const profileDescriptionElement = profileElement.querySelector('.profile__description')

let authId = null

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
    const popup = btn.closest('.popup')
    btn.addEventListener('click', (event) => {
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
const setLightboxImage = (link, title) => {
    imageLightbox.src = link
    imageLightbox.alt = title
    captionLightbox.textContent = title
}
const handleImageClick = (card) => {
    setLightboxImage(card.link, card.name)
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
    clearValidation(formEditProfile, validationConfig)
    openPopup(popupEditProfile)
})
formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const name = formEditProfile.elements.name
    const description = formEditProfile.elements.description
    startLoading(formEditProfile)

    api.updateProfile({
        name: name.value,
        about: description.value
    }).then(res => {
        setProfileData(res)
        closePopup(popupEditProfile)
    }).catch(err => {
        console.log('Error: ', err)
    }).finally(() => {
        finishLoading(formEditProfile)
    })
});

// EditAvatar Popup
const popupEditAvatar = document.querySelector('.popup_type_avatar')
const buttonOpenPopupEditAvatar = document.querySelector('.profile__image-edit')
const inputAvatar = popupEditAvatar.querySelector('.popup__input_type_avatar')

const formEditAvatar = document.forms['profile-image']
formEditAvatar.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const link = formEditAvatar.elements.link

    startLoading(formEditAvatar)

    api.updateAvatar({
        avatar: link.value
    }).then(res => {
        setProfileData(res)
        closePopup(popupEditAvatar)
    }).catch(err => {
        console.log('Error: ', err)
    }).finally(() => {
        finishLoading(formEditAvatar)
    })
});
buttonOpenPopupEditAvatar.addEventListener('click', () => {
    inputAvatar.value = ''
    clearValidation(formEditAvatar, validationConfig)
    openPopup(popupEditAvatar)
})

// formPlaceName Popup
const popupFormPlaceName = document.querySelector('.popup_type_new-card')
const buttonOpenPopupForm = document.querySelector('.profile__add-button')

const formPlaceName = document.forms['new-place'];

buttonOpenPopupForm.addEventListener('click', () => {
    clearValidation(formPlaceName, validationConfig)
    openPopup(popupFormPlaceName)
})

const likeCard = (cardElement, id) => {
    const likeElement = cardElement.querySelector('.card__like-button')
    const action = likeElement.classList.contains('card__like-button_is-active')
        ? api.dislike
        : api.like

    action(id)
        .then(res => updateCardLikes(cardElement, res))
        .catch(err => {
            console.log('Error: ', err)
        })
}

const deleteCard = (cardElement, id) => {
    api.deleteCard(id)
        .then(res => {
            cardElement.remove()
        })
        .catch(err => {
            console.log('Error: ', err)
        })
}

formPlaceName.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const placeName = formPlaceName.elements['place-name']
    const link = formPlaceName.elements.link

    startLoading(formPlaceName)

    api.storeCard({
        name: placeName.value,
        link: link.value,
    }).then(res => {
        cardsList.prepend(createCard(res, authId, deleteCard, likeCard, handleImageClick));
        closePopup(popupFormPlaceName)
        formPlaceName.reset()
    }).catch(err => {
        console.log('Error: ', err)
    }).finally(() => {
        finishLoading(formPlaceName)
    })

});

function setProfileData(data) {
    profileNameElement.textContent = data.name
    profileDescriptionElement.textContent = data.about
    profileImageElement.style.backgroundImage = `url('${data.avatar}')`
    authId = data._id
}

const cardsList = document.querySelector(".places__list");
Promise.all([
    api.fetchMe(),
    api.fetchCards(),
]).then(([userData, cardsArray]) => {
    setProfileData(userData)
    cardsArray.forEach((cardItem) => {
        cardsList.append(createCard(cardItem, authId, deleteCard, likeCard, handleImageClick));
    })
}).catch(err => {
    console.log('err in all', err)
})

enableValidation(validationConfig)
