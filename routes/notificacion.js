const{ Router } = require('express');
const{   insertarNotificacion, updateNotificacion, listarNotificacion, getNotificacion } = require('../controllers/notificacion');
const { validarJWTAdmin } = require('../middlewares/validar-jwt-admin');


const router = Router();

router.get( '/'  ,listarNotificacion);

router.get( '/:id_usuario'  ,getNotificacion);

router.post( '/' ,validarJWTAdmin,insertarNotificacion);

router.put( '/:id_usuario' ,validarJWTAdmin,updateNotificacion);


module.exports = router;









module.exports = router;