'use strict'

var admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require ('../helpers/jwt');

 //REGISTRO DEL ADMINISTRADOR
 const registro_admin = async function(req, res){
    //
    var data = req.body;
    var admin_arr = [];

    admin_arr = await admin.find({email:data.email});

if(admin_arr.length == 0){
   
    if (data.password) {
        bcrypt.hash(data.password, null, null, async function(err, hash){
            if (hash) {
                data.password = hash;
                var reg = await admin.create(data);
                res.status(200).send({data:reg})
            }else{
                res.status(200).send({message:'Error Server', data:undefined})   
            }
        })
    }else {
        res.status(200).send({message:'No Hay Una Contraseña', data:undefined})
    }

   
    }else {
         res.status(200).send({message:'El correo ya existe en la base de datos', data:undefined})
    }

}

const login_admin = async function(req, res){
    var data = req.body;
    var admin_arr = [];

    admin_arr = await admin.find({email:data.email});

    if (admin_arr.length == 0) {
        res.status(200).send({message:'No Se Encontro el Correo', data:undefined});

     }else{
        //LOGIN
        let user = admin_arr[0];

        bcrypt.compare(data.password, user.password, async function(error, check){
            if (check){
                res.status(200).send({
                    data:user,
                    token: jwt.createToken(user)
                    
                });
               
            }else {
                res.status(200).send({message:'La Contraseña No Coincide', data:undefined});
            }
        });
       
       
    }

    
}

module.exports = {
    registro_admin,
    login_admin
}
