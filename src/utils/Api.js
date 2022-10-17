class Api {
    constructor(apiConfig) {
        this._url = apiConfig.url;
        this._headers = apiConfig.headers;
    }

    _check(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-48/users/me', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._check)
    }

    getCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
                method: 'GET',
                headers: this._headers
            })
            .then(this._check)
    }

    setUserInfo(username, description) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: username,
                    about: description
                })
            })
            .then(this._check)
    }

    addNewCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(this._check)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/likes/${id}`, {
                method: isLiked ? 'PUT' : 'DELETE',
                headers: this._headers
            })
            .then(this._check);
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._check);
    }

    addNewAvatar(avatar) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me/avatar', {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar.avatar
                })
            })
            .then(this._check);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-48',
    headers: {
        authorization: '9e48cf18-b746-4718-9bb6-c10376174994',
        'Content-Type': 'application/json'
    }
});

export default api;