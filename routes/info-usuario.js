const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarInfoUsuario, listarInfoUsuarios,updateInfoUsuario,insertarInfoUsuario} = require('../controllers/info-usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/'  ,listarInfoUsuarios); //falta VALIDAR TOKEN

router.post( '/' ,validarJWT,insertarInfoUsuario);

router.get( '/usuario/:id_usuario' ,listarInfoUsuario);

router.put( '/:id' ,validarJWT,updateInfoUsuario);


module.exports = router;