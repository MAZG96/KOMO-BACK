const{ Router } = require('express');
const{ check } = require('express-validator');
const{ insertarItemPedido, listarPedido, listarItemPedidoUsuario, pruebaSEUR, listaritemPedidoporid, updateItemPedido} = require('../controllers/item-pedido');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//router.get( '/'  ,listarInfoUsuarios); //falta VALIDAR TOKEN

router.post( '/' ,insertarItemPedido);

router.get( '/:id_pedido' ,listaritemPedidoporid);

router.post( '/seur' ,pruebaSEUR);

router.put('/',updateItemPedido)

router.get( '/productor/:id_productor' ,listarItemPedidoUsuario);

router.get( '/' ,listarPedido);

module.exports = router;
