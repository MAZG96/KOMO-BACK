const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarProductosCategorias,listarProducto,insertarProducto,getProducto, listarProductoUsuario ,deleteProducto,updateProducto } = require('../controllers/producto');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


const productoController = require('../controllers/producto');

router.get( '/'  ,listarProducto); //falta VALIDAR TOKEN

router.post( '/' ,validarCampos,validarJWT,insertarProducto);

router.get( '/:id' ,getProducto);

router.get( '/categoria/:id' ,listarProductosCategorias);

router.get( '/usuario/:id_usuario' ,listarProductoUsuario);

router.put( '/:id' ,validarCampos,updateProducto);


router.delete( '/:id' ,validarJWT,deleteProducto);

module.exports = router;









module.exports = router;