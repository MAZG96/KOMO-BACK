const{ Router } = require('express');
const{ check } = require('express-validator');
const{ listarFavorito, listarFavoritoUsuario, insertarFavorito, getFavorito, deleteFavorito,pruebaSEUR } = require('../controllers/favorito');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


const favoritoController = require('../controllers/favorito');

router.get( '/'  ,validarJWT,listarFavorito); //falta VALIDAR TOKEN

router.post( '/' ,validarJWT,insertarFavorito);

router.get( '/usuario/:id_usuario' ,listarFavoritoUsuario);



router.get( '/:id_usuario/:id_productor' ,getFavorito);

router.delete( '/:id' ,validarJWT,deleteFavorito);

module.exports = router;

