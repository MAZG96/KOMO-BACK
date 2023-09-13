const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarInfoUsuario, listarInfoUsuarios,updateInfoUsuario,insertarInfoUsuario, listarSugerenciasProductores,subir_documento, updateDocURL} = require('../controllers/info-usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/'  ,listarInfoUsuarios); //falta VALIDAR TOKEN

router.post( '/' ,validarJWT,insertarInfoUsuario);

router.get( '/usuario/:id_usuario' ,listarInfoUsuario);

router.post( '/documento' ,subir_documento);

router.put( '/:id' ,validarJWT,updateInfoUsuario);

router.put( 'documento/:id' ,validarJWT,updateDocURL);

router.get( '/busqueda/:q' ,listarSugerenciasProductores);



module.exports = router;