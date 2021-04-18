const StrategyManager = require('./strategy/strategyManager.js');
const CreateAccountCardStrategy = require('./strategy/createAccountCardStrategy');
const ModifyAccountStrategy = require('./strategy/modifyAccountStrategy');
const GetAccountStrategy = require('./strategy/getAccountStrategy');
const DefaultStrategy = require('./strategy/defaultStrategy');
const Keycloak = require("./keycloak");
const ApiPrepaga = require("./invokeRestUtils/apiPrepaga");

let token = undefined

exports.handler = async function(event, context) {
    if (!token){
        console.log('Genero token')
        const keycloak = new Keycloak('prepagas','GlobalProc','APREPAID', '45ae46c0-1792-4830-a564-7f09f17edc6a', 'password','http://sso.global.globalprocessing.net.ar')
        token = await keycloak.getToken()
        token = JSON.parse(token).access_token
        console.log('Token generado ' + token)
    }
    const apiPrepaga = new ApiPrepaga()
    const resultApiPrepaga = await apiPrepaga.get(`/GP.Prepagas/Api/Productos/62/Cuentas/1669999`, token)
    console.log(resultApiPrepaga)
}

function setStrategies(){
    const strategyManager = new StrategyManager()
    const createAccountCardStrategy = new CreateAccountCardStrategy('createAccountCard','POST', 'http://localhost:3000')
    const modifyAccountStrategy = new ModifyAccountStrategy('modifyAccount','PUT', 'http://localhost:3000')
    const getAccountStrategy = new GetAccountStrategy('getAccount','GET', 'http://localhost:3000')
    const defaultStrategy = new DefaultStrategy('default')
    strategyManager.addStrategy(createAccountCardStrategy)
    strategyManager.addStrategy(defaultStrategy)
    strategyManager.addStrategy(modifyAccountStrategy)
    strategyManager.addStrategy(getAccountStrategy)
    return strategyManager
}