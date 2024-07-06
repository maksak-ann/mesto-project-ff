// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
const createCard = (card, authId, callbackOnDelete, callbackOnLike, callbackOnImageClick) => {
    const element = cardTemplate.querySelector(".card").cloneNode(true);

    const title = element.querySelector('.card__title')
    title.textContent = card.name;

    const image = element.querySelector(".card__image")
    image.src = card.link;
    image.alt = card.name;
    image.addEventListener('click', () => {
        callbackOnImageClick(image)
    })

    const likeCounter = element.querySelector('.card__like-counter')
    likeCounter.textContent = card.likes?.length ?? 0

    const likeButton = element.querySelector(".card__like-button");
    if (card.likes.some(user => user._id === authId)) {
        likeButton.classList.add('card__like-button_is-active')
    }
    likeButton.addEventListener("click", () => {
        callbackOnLike(element, card._id);
    });

    const deleteButton = element.querySelector(".card__delete-button");
    if (card.owner._id !== authId) {
        deleteButton.remove()
    } else{
        deleteButton.addEventListener("click", () => {
            callbackOnDelete(element, card._id);
        });
    }

    return element;
};

const updateCardLikes = (element, data) => {
    const likeCounter = element.querySelector('.card__like-counter')
    const like = element.querySelector('.card__like-button')
    like.classList.toggle('card__like-button_is-active')
    likeCounter.textContent = data.likes?.length ?? 0
}

export {
    createCard,
    updateCardLikes
}
