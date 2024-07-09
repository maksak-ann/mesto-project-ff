const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(config.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(config.inputErrorClass);

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

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, config) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass)
        buttonElement.disabled = true
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass)
        buttonElement.disabled = false
    }
}

const setEventListeners = (formElement, inputSelector, config) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config)
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
    toggleButtonState(inputList, buttonElement, config)
}

export {
    enableValidation,
    clearValidation,
}
