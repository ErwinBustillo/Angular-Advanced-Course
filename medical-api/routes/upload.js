var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');
// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req,res)=>{

    var tipo = req.params.tipo;
    var id = req.params.id;

    //tipos de colleccion
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo)< 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: {messages: 'Tipo de coleccion invalida'}
        });
    }
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono archivo',
            errors: {messages: 'Debe seleccionar una imagen'}
        });
    }

    //obtener el nombre dle archivo 

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extension = nombreCortado[nombreCortado.length -1];

    //solo estas extensiones aceptamos 

    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if(extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: {messages: 'Las extensiones validas son' + extensionesValidas.join(', ')}
        });
    }

    // Nombre de archivo personalizado

    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    //Mover el archivo del temporal a un PATH

    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path,(error)=>{
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: error
            });
        }

        subirPorTipo(tipo,id, nombreArchivo, res);
    });
   
});


function subirPorTipo(tipo,id, nombreArchivo, res){
    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario)=> {
            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }
            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (err) => {
                   if (err) throw err;
                    console.log('Was deleted');
                });
            }

            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });
            });
        });
    }
    if (tipo === 'medicos') {
        Medico.findById(id, (err, medico)=> {
            if (!medico) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'medico no existe',
                    errors: { message: 'medico no existe' }
                });
            }
            var pathViejo = './uploads/medicos/' + medico.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (err)=> {
                    if (err) throw err;
                    console.log('Was deleted');
                });
            }

            medico.img = nombreArchivo;
            medico.save((err, medicoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de medico actualizada',
                    medico: medicoActualizado
                });
            })
        });
    }
    if (tipo === 'hospitales') {
        Hospital.findById(id, (err, hospital)=> {
            if (!hospital) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Hospital no existe',
                    errors: { message: 'Hospital no existe' }
                });
            }
            var pathViejo = './uploads/hospitales/'+ hospital.img;

            // Si existe, elimina la imagen anterior
             if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo, (err)=> {
                    if (err) throw err;
                    console.log('Was deleted');
                });
            }

            hospital.img = nombreArchivo;
            hospital.save((err, hospitalActualizado)=>{

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen del hospital actualizada',
                    hospital: hospitalActualizado
                });
            })
        });
    }
}
module.exports = app;