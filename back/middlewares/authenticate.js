'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'cesargomez';

exports.auth = function(req, res, next){
    //console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'No Headers Error'});
    }

        var token = req.headers.authorization.replace(/['"]+/g,'');
        var segment = token.split('.');

        //console.log(token);
        //console.log(segment);

        if (segment.length != 3) {
            return res.status(403).send({message: 'Token Invalido'});
            
        }else{
            try {
                var payload = jwt.decode(token, secret);
                //console.log(payload); para ver los datos de expiracion

                if (payload.exp <= moment().unix()) {
                    return res.status(403).send({message: 'Token Expirado'});  
                }

            } catch (error) {
                return res.status(403).send({message: 'Token Invalido'});
            }
        }

        req.user = payload;

    next();
}