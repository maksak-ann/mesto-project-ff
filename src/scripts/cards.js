import {openPopup} from "./modal";

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

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;


const setLightboxImage = (popup, img) => {
    const image = popup.querySelector('img')
    const caption = popup.querySelector('.popup__caption')
    image.src = img.src
    caption.textContent = img.alt
}

// Нажатие на картинку
const handleImageClick = (image) => {
    const popup = document.querySelector('.popup_type_image')
    setLightboxImage(popup, image)
    openPopup(popup)
}

// @todo: Функция создания карточки
const createCard = (card, callbackOnDelete, callbackOnLike) => {
    const element = cardTemplate.querySelector(".card").cloneNode(true);

    const image = element.querySelector(".card__image")
    image.src = card.link;
    image.alt = card.name;
    image.textContent = card.name;
    image.addEventListener('click', () => {
        handleImageClick(image)
    })

    const deleteButton = element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", (event) => {
        callbackOnDelete(element);
    });

    const likeButton = element.querySelector(".card__like-button");
    likeButton.addEventListener("click", (event) => {
        callbackOnLike(element);
    });

    return element;
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
    card.remove();
};

const likeCard = (card) => {
    const like = card.querySelector('.card__like-button')
    like.classList.toggle('card__like-button_is-active')
}

export {
    createCard,
    deleteCard,
    initialCards,
    likeCard
}