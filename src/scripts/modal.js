const handleEscPress = (event) => {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened')
        closePopup(popup)
    }
}

const handleOpenPopupButtonClick = (el) => {
    const popup = document.querySelector(`.${el.dataset.popupTarget}`)
    openPopup(popup)
}

const handleClosePopupButtonClick = (el) => {
    const popup = el.closest('.popup_is-opened')
    closePopup(popup)
}

const openPopup = (popup) => {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', handleEscPress)
    popup.addEventListener('click', (event) => {
        const target = event.target
        // Клик по оверлэю
        if (target.classList.contains('popup')) {
            closePopup(target)
        }
    })
}

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', handleEscPress)
}

export {
    handleEscPress,
    handleOpenPopupButtonClick,
    handleClosePopupButtonClick,
    closePopup,
    openPopup,
}
