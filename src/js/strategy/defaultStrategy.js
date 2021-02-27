class DefaultStrategy{
    constructor(uri) {
        this._uri = uri
    }

    doAction(body, method){
        console.log('defaultStrategy -- method : ' + method + ' - body : ' + JSON.stringify(body))
    }
}

module.exports = DefaultStrategy;