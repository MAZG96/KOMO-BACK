const{ Router } = require('express');
const{   insertarNotificacion, updateNotificacion, listarNotificacion, getNotificacion } = require('../controllers/notificacion');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get( '/'  ,listarNotificacion);

router.get( '/:id_usuario'  ,getNotificacion);

router.post( '/' ,validarJWT,insertarNotificacion);

router.put( '/:id_usuario' ,validarJWT,updateNotificacion);


module.exports = router;









module.exports = router;