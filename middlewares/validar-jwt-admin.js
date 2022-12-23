const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWTAdmin = (req,res = response, next) =>{

    const token = req.header('x-token'); //obtener token cabecera

    console.log(token)


    if( !token ){
        console.log("cvalidando")
        return res.status(401).json({
            ok: false,
            msg: "error en el token"
        });
    }

    try {

        
        const { uid, name,email, rol} = jwt.verify( token, process.env.SECRET_JWT_SEED ); // verificar jwt
        
        req.uid = uid;
        req.name = name;
        req.rol = rol;
        req.email = email;

        console.log(jwt.verify( token, process.env.SECRET_JWT_SEED ));


        if (rol != 'ROL_ADMIN') {
            return res.status(401).json({
                ok: false,
                msg: "token no valido"
            });
        }

    } catch (error) {
        
        return res.status(401).json({
            ok: false,
            msg: "token no valido"
        });
    }


    //todo OK
    next();
    
}


module.exports = {
    validarJWTAdmin
}