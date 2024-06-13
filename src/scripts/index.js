// CSS
import "../pages/index.css";

// Imports
import {
    createCard,
    deleteCard,
    likeCard
} from "./cards";
import {
    handleOpenPopupButtonClick,
    openPopup,
    closePopup,
    clickOnOverlay,
} from "./modal"

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
const lightboxPopup = document.querySelector(('.popup_type_image'))
const image = lightboxPopup.querySelector('img')
const caption = lightboxPopup.querySelector('.popup__caption')
const setLightboxImage = (img) => {
    image.src = img.src
    image.alt = img.alt
    caption.textContent = img.alt
}
const handleImageClick = (image) => {
    setLightboxImage(image)
    openPopup(lightboxPopup)
}

// EditProfile Popup
const editProfilePopup = document.querySelector('.popup_type_edit')
const openEditPopupButton = document.querySelector('.profile__edit-button')
const nameInput = editProfilePopup.querySelector('.popup__input_type_name')
const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description')

const wrapper = document.querySelector('.profile__info')
const nameLabel = wrapper.querySelector('.profile__title')
const descriptionLabel = wrapper.querySelector('.profile__description')

const profileForm = document.forms['edit-profile']

openEditPopupButton.addEventListener('click', () => {
    nameInput.value = nameLabel.textContent
    descriptionInput.value = descriptionLabel.textContent
    openPopup(editProfilePopup)
})

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

    closePopup(editProfilePopup)
});

// CardForm Popup
// Открыть попап
const formPopup = document.querySelector('.popup_type_new-card')
const openFormPopupButton = document.querySelector('.profile__add-button')

const cardForm = document.forms['new-place'];

openFormPopupButton.addEventListener('click', () => {
    openPopup(formPopup)
})

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
    }, deleteCard, likeCard, handleImageClick));

    closePopup(formPopup)
    cardForm.reset()
});

// Создание карточек
const cardsLst = document.querySelector(".places__list");
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
initialCards.forEach((cardItem) => {
    cardsLst.append(createCard(cardItem, deleteCard, likeCard, handleImageClick));
});