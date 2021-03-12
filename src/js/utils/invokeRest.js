var https = require("https");

function invokeService(options, jsonObject, next) {
    var req = https.request(options, function(res) {
        let contentType = res.headers['content-type'];
        let data = '';

        res.on('data', function (element) {
            data += element;
        }).on('end', function () {
            let response = null;
            if (contentType.indexOf('application/json') != -1) {
                response = JSON.parse(data);
            }
            next(response, null);
        })
            .on('error', function(err) {
                console.log('Error al procesar el mensaje: ' + err)
            })
            .on('uncaughtException', function (err) {
                console.log(err);
            });
    }).on('error', function (err) {
        console.log('HTTP request failed: ' + err);
        next(null, err);
    });

    if (jsonObject) {
        req.write(JSON.stringify(jsonObject));
    }

    req.end();
}

module.exports = invokeService;