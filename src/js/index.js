const Keycloak = require("./keycloak");
const WolfgangApi = require("./invokeRestUtils/wolfgangApi");

let token = undefined

exports.handler = async function(event, context) {
    console.debug('Event ' + event)
    for (let i = 0; i < event.Records.length; i++)
    {
        if (event.Records[i].body) {
            const bodyJson = JSON.parse(event.Records[i].body)
            if (!token) {
                console.log('Genero token')
                const keycloak = new Keycloak('prepagas','GlobalProc','APREPAID', '45ae46c0-1792-4830-a564-7f09f17edc6a', 'password','http://sso.global.globalprocessing.net.ar')
                token = await keycloak.getToken()
                token = JSON.parse(token).access_token
                console.info('Token generado')
            }
            if (bodyJson.origin.toUpperCase() === 'GW') {
                await invokeWolfgangApi(bodyJson);
            } else {
                //Invoke Autorizador
            }
        }
    }

}

async function invokeWolfgangApi(bodyJson) {
    const wolfgangApi = new WolfgangApi()
    const method = bodyJson.method
    const path = bodyJson.uri.split('GP.Prepagas').pop();
    let resultWolfgangApi
    switch (method.toUpperCase()) {
        case 'GET':
            console.info(`Invoke wolfgangApi. Method ${method} - path ${path}`)
            resultWolfgangApi = await wolfgangApi.get(path, token)
            console.info('Result : ' + resultWolfgangApi)
            break;
        case 'PUT':
            console.info(`Invoke wolfgangApi. Method ${method} - path ${path} - body ${bodyJson.body}`)
            resultWolfgangApi = await wolfgangApi.put(path, token, bodyJson.body)
            console.info('Result : ' + resultWolfgangApi)
            break;
        case 'POST':
            console.info(`Invoke wolfgangApi. Method ${method} - path ${path} - body ${bodyJson.body}`)
            resultWolfgangApi = await wolfgangApi.post(path, token, bodyJson.body)
            console.info('Result : ' + resultWolfgangApi)
            break;
        case 'DELETE':
            console.info(`Invoke wolfgangApi. Method ${method} - path ${path}`)
            resultWolfgangApi = await wolfgangApi.delete(path, token)
            console.info('Result : ' + resultWolfgangApi)
            break;
        default:
            console.log(`Sorry, we are out of ${expr}.`);
    }
}