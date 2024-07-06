const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = inputElement.nextElementSibling;
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputElement.classList.add(config.inputErrorClass);
    buttonElement.classList.add(config.inactiveButtonClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = inputElement.nextElementSibling;
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputElement.classList.remove(config.inputErrorClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, inputSelector, config) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config)
        });
    });
};

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config.inputSelector, config);
    });
}

function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity("")
        hideInputError(formElement, inputElement, config)
    });
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    buttonElement.classList.add(config.inactiveButtonClass);
}

export {
    enableValidation,
    clearValidation,
}
