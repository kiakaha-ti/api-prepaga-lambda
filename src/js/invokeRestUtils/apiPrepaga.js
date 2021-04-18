const fetch = require('node-fetch');

class ApiPrepaga{

    async get(path, token){
        const url = `https://v2autorizador-api-qa.global.globalprocessing.net.ar` + path
        return fetch(url, {
            method: 'GET',
            headers: {
                'X-AUTHORIZATION': 'Bearer ' + token
            },
        }).then(res => res.text()).then(body => {
            console.log(body)
            return body
        }).catch((e) => console.log('error ' + e))
    }
}

module.exports = ApiPrepaga;