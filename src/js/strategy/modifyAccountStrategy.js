const invokeService = require('../invokeRestUtils/invokeRest');

class ModifyAccountStrategy{
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

    createRequest(body){
        return {
            Nombre: body.Nombre ,
            Apellido: body.Apellido,
            Email: body.Email,
            Sexo: body.Sexo,
            FechaNacimiento: body.FechaNacimiento,
            Embozado: body.Embozado,
            Documento: body.Documento,
            Telefonos: body.Telefono,
            DomicilioParticular: body.DomicilioParticular,
            DomicilioCorrespondencia: body.DomicilioCorrespondencia,
            IdCuentaExterna: body.IdCuentaExterna,
            SucursalEmisora: body.SucursalEmisora,
            GrupoAfinidad: body.GrupoAfinidad
        }
    }
}

module.exports = ModifyAccountStrategy;