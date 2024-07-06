const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
        authorization: 'b4eda160-fd79-4979-8033-7987db87da5a',
        'Content-Type': 'application/json'
    }
}

function get(url) {
    return fetch(url, {
        headers: config.headers
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => {
        console.log('err', err)
    });
}

function post(url, data = {}) {
    return fetch(url, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => {
        console.log('err', err)
    });
}

function put(url, data = {}) {
    return fetch(url, {
        headers: config.headers,
        method: 'PUT',
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => {
        console.log('err', err)
    });
}

function patch(url, data) {
    return fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => {
        console.log('err', err)
    });
}

function apiDelete(url, data = {}) {
    return fetch(url, {
        method: 'DELETE',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => {
        console.log('err', err)
    });
}

export {
    config,
    get,
    post,
    patch,
    put,
    apiDelete
}
