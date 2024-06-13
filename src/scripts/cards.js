// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
const createCard = (card, callbackOnDelete, callbackOnLike, callbackOnImageClick) => {
    const element = cardTemplate.querySelector(".card").cloneNode(true);

    const image = element.querySelector(".card__image")
    const title = element.querySelector('.card__title')
    image.src = card.link;
    image.alt = card.name;
    title.textContent = card.name;
    image.addEventListener('click', () => {
        callbackOnImageClick(image)
    })

    const deleteButton = element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
        callbackOnDelete(element);
    });

    const likeButton = element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
        callbackOnLike(element);
    });

    return element;
};

// Функция удаления карточки
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
    likeCard
}