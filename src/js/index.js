const StrategyManager = require('./strategy/strategyManager.js');
const CreateAccountCardStrategy = require('./strategy/createAccountCardStrategy');

exports.handler =  async function(event, context) {
    const strategyManagerInstance = setStrategies()
    for (let i = 0; i < event.Records.length; i++)
    {
        if (event.Records[i].body) {
            const bodyJson = JSON.parse(event.Records[i].body)
            const strategyInstance = strategyManagerInstance.getStrategy(bodyJson.uri)
            strategyInstance.doAction(bodyJson.body, bodyJson.method)
        }
    }
    return 'Hello World!';
}

function setStrategies(){
    const strategyManager = new StrategyManager()
    const createAccountCardStrategy = new CreateAccountCardStrategy('createAccountCardStrategy')
    strategyManager.addStrategy(createAccountCardStrategy)
    return strategyManager
}