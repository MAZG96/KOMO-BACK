const{ Router } = require('express');
const{ check } = require('express-validator');
const{ insertarInfoPedido, getInfoPedido, updateInfoPedido} = require('../controllers/info-pedido');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


const productoController = require('../controllers/info-pedido');


router.post( '/' ,[
    
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('apellidos','el apellido es obligatorio').not().isEmpty(),
    check('calle','la calle es obligatoria').not().isEmpty(),
    check('piso','la direccion es obligatoria').not().isEmpty(),
    check('codigo_postal','el codigo postal es obligatorio').isLength({ min: 5, max: 5 }),
    check('localidad','la localidad es obligatoria').not().isEmpty(),
    check('provincia','la provincia es obligatoria').not().isEmpty(),
    check('telefono','el telefono es obligatorio').isMobilePhone(),
    check('email','el email es obligatorio').isEmail(),
    validarCampos
    
] ,insertarInfoPedido);

router.get( '/:id_usuario' ,getInfoPedido);



router.put( '/:id' ,validarJWT,updateInfoPedido);


module.exports = router;

