const fetch = require('node-fetch');

class WolfgangApi{

    async get(path, token){
        const url = `http://v2entidad9999-api-qa.global.globalprocessing.net.ar/prepaga` + path
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }).then(res => res.text()).then(body => {
            return body
        }).catch((e) => console.log('error ' + e))
    }

    async post(path, token, body){
        const url = `http://v2entidad9999-api-qa.global.globalprocessing.net.ar/prepaga` + path
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: body
        }).then(res => res.text()).then(body => {
            return body
        }).catch((e) => console.log('error ' + e))
    }

    async put(path, token, body){
        const url = `http://v2entidad9999-api-qa.global.globalprocessing.net.ar/prepaga` + path
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: body
        }).then(res => res.text()).then(body => {
            return body
        }).catch((e) => console.log('error ' + e))
    }

    async delete(path, token){
        const url = `http://v2entidad9999-api-qa.global.globalprocessing.net.ar/prepaga` + path
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }).then(res => res.text()).then(body => {
            return body
        }).catch((e) => console.log('error ' + e))
    }
}

module.exports = WolfgangApi;