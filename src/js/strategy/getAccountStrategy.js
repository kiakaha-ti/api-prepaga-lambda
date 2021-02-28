const invokeService = require('../invokeRestUtils/invokeRest');

class GetAccountStrategy{
    constructor(uri, method, uriNew) {
        this._uri = uri
        this._method = method
        this._uriNew = uriNew
    }

    doAction(body, method, headers){
        console.log('Request received:   method : ' + method + ' - body : ' + JSON.stringify(body))
        const request = this.createRequest(body)
        console.log('Request to send : ' + JSON.stringify(request))
        var options = {
            method: this._method,
            path: this._uriNew,
            authorization: headers.authorization
        };

        invokeService(options,request, function (users, err) {
            if(users){
                console.log('Response :')
                console.log(JSON.parse(users))
            }
        })
    }

}

module.exports = GetAccountStrategy;