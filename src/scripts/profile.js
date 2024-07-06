const profileElement = document.querySelector('.profile__info')
const profileImageElement = document.querySelector('.profile__image')
const profileNameElement = profileElement.querySelector('.profile__title')
const profileDescriptionElement = profileElement.querySelector('.profile__description')

let authId = null

function setProfileData(data) {
    console.log('profile', data)
    profileNameElement.textContent = data.name
    profileDescriptionElement.textContent = data.about
    profileImageElement.style.backgroundImage = `url('${data.avatar}')`
    authId = data._id
}

export {
    setProfileData,
    authId
}
