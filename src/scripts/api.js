const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
        authorization: 'b4eda160-fd79-4979-8033-7987db87da5a',
        'Content-Type': 'application/json'
    }
}

const getResponseData = (response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
}

const fetchMe = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(res => getResponseData(res))
}

const fetchCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(res => getResponseData(res))
}

const updateProfile = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => getResponseData(res))
}

const like = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(res => getResponseData(res))
}

const dislike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => getResponseData(res))
}

const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => getResponseData(res))
}

const storeCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => getResponseData(res))
}

const updateAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => getResponseData(res))
}

export {
    fetchMe,
    fetchCards,
    updateProfile,
    like,
    dislike,
    deleteCard,
    storeCard,
    updateAvatar
}
