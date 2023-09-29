const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarPedido, insertarPedido, getPedido, listarPedidoUsuario, updatePedido,listarDatosGrafica,notificar_pedido, notificar_venta, notificar_pedido_admin} = require('../controllers/pedido');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/'  ,validarJWT,listarPedido); //falta VALIDAR TOKEN

router.post( '/' ,[
    
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('apellidos','el apellido es obligatorio').not().isEmpty(),
    check('calle','la calle es obligatoria').not().isEmpty(),
    check('codigo_postal','el codigo postal es obligatorio').isLength({ min: 5, max: 5 }),
    check('localidad','la localidad es obligatoria').not().isEmpty(),
    check('provincia','la provincia es obligatoria').not().isEmpty(),
    check('telefono','el telefono es obligatorio').isMobilePhone(),
    check('email','el email es obligatorio').isEmail(),
    validarCampos
    
] ,insertarPedido);

router.post( '/send'  ,notificar_pedido);
router.post( '/sendventa'  ,notificar_venta);


router.post( '/send_admin'  ,notificar_pedido_admin);


router.get( '/:id' ,getPedido);

router.get( '/grafica/:datos' ,validarJWT,listarDatosGrafica);

router.get( '/usuario/:id_usuario',listarPedidoUsuario);

router.get( '/grafica/:datos' ,validarJWT,listarDatosGrafica);

router.get( '/usuario/:id_usuario', validarJWT,listarPedidoUsuario);

router.put( '/:id' ,updatePedido);


module.exports = router;
