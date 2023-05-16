export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse() {
        return (response) => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(new Error('Что-то пошло не так....'))
        }
    }

    getAllCards() {
        return fetch(`${this._url}/v1/cohort-58/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse())
    }

    getUserInfo() {
        return fetch(`${this._url}/v1/cohort-58/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse())

    }

    createNewCard(data) {
        return fetch(`${this._url}/v1/cohort-58/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse())
    }

    setUserInfo(data) {
        return fetch(`${this._url}/v1/cohort-58/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._checkResponse())
    }

    createNewAvatar(data) {
        return fetch(`${this._url}/v1/cohort-58/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkResponse())
    }

    changeLikeCard(id, idCard) {
        if (idCard === true) {
            return fetch(`${this._url}/v1/cohort-58/cards/${id}/likes`, {
                headers: this._headers,
                method: 'DELETE',
            })
                .then(this._checkResponse())
        } else {
            return fetch(`${this._url}/v1/cohort-58/cards/${id}/likes`, {
                headers: this._headers,
                method: 'PUT',
            })
                .then(this._checkResponse())
        }
    }

    deleteCards(id) {
        return fetch(`${this._url}/v1/cohort-58/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(this._checkResponse())
    }
}

const configApi = {
    url: "http://api.ivachev.k.f.students.nomoredomains.monster",
    headers: {
        'Content-Type': 'application/json'
    },
}

export const api = new Api(configApi);