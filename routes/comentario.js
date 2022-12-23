const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarComentarioProducto,listarComentario,insertarComentario,getComentario, listarComentarioProductor ,deleteComentario,updateComentario } = require('../controllers/comentario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


const comentarioController = require('../controllers/comentario');

router.get( '/'  ,validarJWT,listarComentario); //falta VALIDAR TOKEN

router.post( '/' ,validarJWT,insertarComentario);

router.get( '/producto/:id_producto' ,listarComentarioProducto);

router.get( '/productor/:id_productor' ,listarComentarioProductor);

router.get( '/:id' ,getComentario);


router.put( '/:id' ,validarJWT,updateComentario);


router.delete( '/:id' ,validarJWT,deleteComentario);

module.exports = router;

