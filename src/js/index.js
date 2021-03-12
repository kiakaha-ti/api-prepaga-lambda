const invokeService = require('./utils/invokeRest')
const rewriteUri = require('./utils/rewriteUri')

exports.handler = async function (event, context) {
    for (let i = 0; i < event.Records.length; i++) {
        if (event.Records[i].body) {
            const bodyJson = JSON.parse(event.Records[i].body)

            console.log('Request received:   method : ' + bodyJson.method + ' - body : ' + bodyJson.body)

            var options = {
                method: bodyJson.method,
                path: rewriteUri(bodyJson.Uri),
                headers: bodyJson.headers
            };

            invokeService(options, request, function (users, err) {
                if (users) {
                    console.log('Response :')
                    console.log(JSON.parse(users))
                }
            })
        }
    }
}