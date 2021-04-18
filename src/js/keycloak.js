const fetch = require('node-fetch');

class Keycloak{
    constructor(username, password, clientId, clientSecret, grant, url) {
        this._username = username
        this._password = password
        this._clientId = clientId
        this._clientSecret = clientSecret
        this._grant = grant
        this._url = url
    }

    async getToken(){
        let details = {
            'username': this._username,
            'password': this._password,
            'grant_type': this._grant,
            'client_id': this._clientId,
            'client_secret': this._clientSecret
        };

        let formBody = []
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&")
        const urlToken = this._url + `/auth/realms/GlobalProcessing/protocol/openid-connect/token`
        return fetch(urlToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(res => res.text()).then(body => {
            return body
        }).catch((e) => console.log('error ' + e))
    }
}

module.exports = Keycloak;