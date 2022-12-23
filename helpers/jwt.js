const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name,email, rol) =>{
    
    const payload = {uid, name,email, rol};

    return new Promise( (resolve, reject) => {
        
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '24h' // expiracion del token
        }, (err, token) => {
    
            if( err ){ //FALLA GENERAR TOKEN
                console.log(err);
                reject(err);
            }else{
                resolve( token )
            }
        })

    });
}

module.exports = {
    generarJWT
}