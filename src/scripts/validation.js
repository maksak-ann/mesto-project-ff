let config = {}

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = inputElement.nextElementSibling;
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputElement.classList.add(config.inputErrorClass);
    buttonElement.classList.add(config.inactiveButtonClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

};

const hideInputError = (formElement, inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputElement.classList.remove(config.inputErrorClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement, inputSelector) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
        });
    });
};

function enableValidation(options) {
    config = options
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config.inputSelector);
    });
}

function clearValidation(profileForm, validationConfig) {
    console.log(profileForm, validationConfig)
}

export {
    enableValidation,
    clearValidation
}
