var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//middleware para verificar token

exports.verificaToken = function (req,res,next){
    var token = req.query.token;
    jwt.verify(token, SEED,(err,decode)=> {
        if(err){
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors:err
            });
        }
        
        req.usuario = decode.usuario;

        next();

    });
}

//verifica admin
exports.verificaAdmin = function (req,res,next){
    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    }else{
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: {message: 'NO es admin'}
        });
    }
}

//verifica admin o mismo usuario
exports.verificaADMINORUSER = function (req,res,next){
    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || id === usuario._id) {
        next();
        return;
    }else{
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No admin ni mismo usuario',
            errors: {message: 'NO es admin'}
        });
    }
}

