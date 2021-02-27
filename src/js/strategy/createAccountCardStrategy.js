class CreateAccountCardStrategy{
    constructor(uri) {
        this._uri = uri
    }

    doAction(body, method){
        console.log('method : ' + method + ' - body : ' + JSON.stringify(body))
    }
}

module.exports = CreateAccountCardStrategy;