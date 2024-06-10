// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsLst = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (card, callbackOnDelete) => {
  const element = cardTemplate.querySelector(".card").cloneNode(true);

  element.querySelector(".card__image").src = card.link;
  element.querySelector(".card__image").alt = card.name;
  element.querySelector(".card__title").textContent = card.name;

  const deleteButton = element.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (event) => {
    callbackOnDelete(element);
  });

  return element;
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((cardItem) => {
  cardsLst.append(createCard(cardItem, deleteCard));
});
