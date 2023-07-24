const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarAccessPoint, CalcularEnvio, CrearEnvio, GenerarEtiqueta, CalcularEnvioMBE} = require('../controllers/ups');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post( '/'  ,listarAccessPoint); //falta VALIDAR TOKEN
router.post( '/rateMBE'  ,CalcularEnvioMBE); //falta VALIDAR TOKEN
router.post( '/rate'  ,CalcularEnvio); //falta VALIDAR TOKEN
router.post( '/ship'  ,CrearEnvio); //falta VALIDAR TOKEN
router.post( '/label'  ,GenerarEtiqueta); //falta VALIDAR TOKEN



module.exports = router;