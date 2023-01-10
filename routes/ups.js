const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarAccessPoint } = require('../controllers/ups');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.post( '/'  ,listarAccessPoint); //falta VALIDAR TOKEN


module.exports = router;