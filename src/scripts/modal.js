const handleEscPress = (event) => {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened')
        closePopup(popup)
    }
}

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', handleEscPress)
}

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', handleEscPress)
}

const clickOnOverlay = (target) => {
    if (target.classList.contains('popup')) {
        closePopup(target)
    }
}

export {
    closePopup,
    openPopup,
    clickOnOverlay
}
