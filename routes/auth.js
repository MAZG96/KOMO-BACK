const{ Router } = require('express');
const{ check } = require('express-validator');
const{ crearUsuario,loginUsuario,revalidarToken, loginUsuarioAdmin, revalidarTokenAdmin, loginGoogle, activarUsuario, recuperacionUsuario, restablecerPassword, getUsuario} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Crear usuario
router.post( '/new',[
    
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','la contraseña es obligatorio').isLength({ min:6 }),
    validarCampos
    
] , crearUsuario);

router.post( '/google' , loginGoogle);

router.put( '/recuperacion' , recuperacionUsuario);

router.put( '/restablecer' ,validarJWT, restablecerPassword);


// Login usuario
router.post( '/',[

    
    check('email','el email es obligatorio').isEmail(),
    check('password','la contraseña es obligatorio').isLength({ min:6 }),
    validarCampos
    
] , loginUsuario);

router.put( '/activar' , activarUsuario);

router.post( '/admin',[

    
    check('email','el email es obligatorio').isEmail(),
    check('password','la contraseña es obligatorio').isLength({ min:6 }),
    validarCampos
    
] , loginUsuarioAdmin);

//Validar token 
//LO DEJAMOS AQUI POR HOY
router.get( '/renew' , validarJWT , revalidarToken);

router.get( '/usuario/:id' , getUsuario);


router.get( '/renewadmin' , validarJWT , revalidarTokenAdmin);



module.exports = router;