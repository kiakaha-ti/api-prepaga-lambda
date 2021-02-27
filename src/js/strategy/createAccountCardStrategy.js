class CreateAccountCardStrategy{
    constructor(uri) {
        this._uri = uri
    }

    doAction(payload){
        console.log(payload)
    }
}

module.exports = CreateAccountCardStrategy;