const{ Router } = require('express');
const{ check } = require('express-validator');
const{   listarZona, insertarZona, getZona, listarZonasProvincia, deleteZona, updateZona,getZonaCP } = require('../controllers/zona');
const { validarJWTAdmin } = require('../middlewares/validar-jwt-admin');


const router = Router();


const zonaController = require('../controllers/zona');

router.get( '/'  ,listarZona); //falta VALIDAR TOKEN

router.post( '/' ,validarJWTAdmin,insertarZona);

router.get( '/:id' ,getZona);

router.get( '/cp/:cp' ,getZonaCP);


router.get( '/provincia/:provincia' ,listarZonasProvincia);

router.put( '/:id' ,validarJWTAdmin,updateZona);

router.delete( '/:id' ,validarJWTAdmin,deleteZona);

module.exports = router;









module.exports = router;