const StrategyManager = require('./strategy/strategyManager.js');
const CreateAccountCardStrategy = require('./strategy/createAccountCardStrategy');
const ModifyAccountStrategy = require('./strategy/modifyAccountStrategy');
const GetAccountStrategy = require('./strategy/getAccountStrategy');
const DefaultStrategy = require('./strategy/defaultStrategy');

exports.handler =  async function(event, context) {
    const strategyManagerInstance = setStrategies()
    for (let i = 0; i < event.Records.length; i++)
    {
        if (event.Records[i].body) {
            const bodyJson = JSON.parse(event.Records[i].body)
            const strategyInstance = strategyManagerInstance.getStrategy(bodyJson.uri)
            strategyInstance.doAction(bodyJson.body, bodyJson.method, bodyJson.headers)
        }
    }
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