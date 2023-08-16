const { response } = require("express");
const usuarioModel = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../helpers/jwt");
var hbs = require('nodemailer-express-handlebars')



//GOOGLE OAUTH
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "103028434187-41n7grnuhdlvssjvqc65cfs9uc399kb2.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID);


const getUsuario = (req, res) => {
    usuarioModel.findOne({
      where: {
        id: req.params.id,
      }
    })
      .then(usuario => {

        usuario.password = '';
        usuario.uid = '';
        usuario.rol = '';
        res.json(usuario);
      }

        )
      .catch(err => res.json({ error: err }))
      
  }
  

const activarUsuario = async (req, res) =>{

    const {token} = req.body;

    if( !token ){
        console.log("cvalidando")
        return res.status(401).json({
            ok: false,
            msg: "error en el token"
        });
    }

    try {

        
        console.log(token);
        
        const { uid, name,email, rol} = jwt.verify( token, process.env.SECRET_JWT_SEED ); // verificar jwt
        
        const usuario = await usuarioModel.findOne({ where: { email: email} }); // comprobamos que no existe un usuario con el email

        console.log(usuario);
        
        usuarioModel.update(
            {
              uid: usuario.uid,
              email: usuario.email,
              password: usuario.password,
              name: usuario.name,
              rol: "ROL_USER"
            },
            {
            where: {id: usuario.id}
              
            })
            .then(usuario => res.send(usuario));


       

    } catch (error) {
        
        return res.status(401).json({
            ok: false,
            msg: "token no valido"
        });
    }

    
}

const recuperacionUsuario = async (req, res) =>{

    const {correo} = req.body;

    if( !correo ){
        
        return res.status(401).json({
            ok: false,
            msg: "correo no introducido"
        });
    }
        
        var nodemailer = require('nodemailer');

        const usuario = await usuarioModel.findOne({ where: { email: correo} }); // comprobamos que no existe un usuario con el email

        if (usuario == null){
            return res.status(401).json({
                ok: false,
                msg: "correo no asociado a ninguna cuenta"
            });
        }

        const token = await generarJWT(usuario.uid, usuario.name, usuario.email, usuario.rol); //genera token

    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        host: "smtp.mail.us-east-1.awsapps.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "hola@komolocalfoods.com",
          pass: "komoLOCAL12",
        },
      });

    transporter.use('compile', hbs({
        viewPath: './views/email/',
        extName: '.hbs',
        defaultLayout: null
      }));

    var mailOptions = {
        from: 'hola@komolocalfoods.com',
        to: usuario.email,
        subject: 'Recuperacion de cuenta KOMO',
        template: 'recover',
        context: {
            correo_recuperacion: correo,
            nombre: usuario.name,
            token_recuperacion: token
        }

      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

      return res.status(201).json({
        ok: true
    })
       

    
}

const restablecerPassword = async (req, res) => {
    
    let {password} = req.body;

    const salt = bcrypt.genSaltSync();


    const token = req.header('x-token'); //obtener token cabecera

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: "error en el token"
        });
    }

    try {
        
        const { email} = jwt.verify( token, process.env.SECRET_JWT_SEED ); // verificar jwt
        
        const usuario = await usuarioModel.findOne({ where: { email: email} }); // comprobamos que no existe un usuario con el email

        password = bcrypt.hashSync( password, salt ); //encripción de la password
        
        usuarioModel.update(
            {
              uid: usuario.uid,
              email: usuario.email,
              password: password,
              name: usuario.name,
              rol: "ROL_USER"
            },
            {
            where: {id: usuario.id}
              
            })
            .then(usuario => 
                res.status(200).json({
                ok: true,
                msg: "Contraseña actualizada"
            }));

    } catch (error) {
        
        return res.status(401).json({
            ok: false,
            msg: "token no valido"
        });
    }
}


const crearUsuario = async (req, res) => {

    const salt = bcrypt.genSaltSync();

    let {email, name, password} = req.body; //parametros de la peticion

    const usuario = await usuarioModel.findOne({ where: { email: email} }); // comprobamos que no existe un usuario con el email

    if( usuario !== null ){
        return res.status(400).json({
            ok:false,
            msg:'Usuario existe con este email'
        });
    }

    
    password = bcrypt.hashSync( password, salt ); //encripción de la password

    const dbusuario = new usuarioModel(req.body);

    const rol = "INACTIVO";

    const token = await generarJWT(dbusuario.uid, dbusuario.name, dbusuario.email, rol); //genera token

    var nodemailer = require('nodemailer');

    //Creamos el objeto de transporte
    var transporter = nodemailer.createTransport({
        host: "smtp.mail.us-east-1.awsapps.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "hola@komolocalfoods.com",
          pass: "komoLOCAL12",
        },
      });

    transporter.use('compile', hbs({
        viewPath: './views/email/',
        extName: '.hbs',
        defaultLayout: null
      }));

    var mailOptions = {
        from: 'hola@komolocalfoods.com',
        to: dbusuario.email,
        subject: 'Confirmación de cuenta KOMO',
        template: 'recover',
        context: {
            token: token
        }

      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

    const user = usuarioModel.create({
      email,
      name,
      password,
      rol

    })
      .then(usuario => {
          
          return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            rol,
            token
        })
    });

    

  }

const loginGoogle = async (req, res) => {

    let token = req.body.token

    console.log(token);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        const name = payload['name'];
        const email = payload['email'];
        const rol = "ROL_USER";

        
        const usuario = await usuarioModel.findOne({ where: { email: email} }); // comprobamos que no existe un usuario con el email

        if( usuario !== null ){

            const token = await generarJWT(usuario.uid, usuario.name,usuario.email, usuario.rol);
  
            // respuesta(BORRAR EN MODO PRODUCCION)
    
            return res.status(201).json({
                ok: true,
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                rol: usuario.rol,
                token
            })

            /*return res.status(400).json({
                ok:false,
                msg:'Usuario existe con este email'
            });*/

        }else{ //NUEVO USUARIO

            const rol = "ROL_USER";

            const token = await generarJWT(userid, name, email, rol); //genera token

            const password = "none"

            console.log("token: "+token);

            const user = usuarioModel.create({
            email,
            name,
            password,
            rol

            })
            .then(usuario => {
                
                return res.status(201).json({
                    ok: true,
                    uid: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    rol,
                    token
                })
            });

        }

        //comprobar si existe un usuario registrado con ese correo
      }
      verify().catch(console.error);
}


/*
const crearUsuario2 = async(req,res = response) => {

    const {email, name, password} = req.body;

    try {

    //verificar mail es unico
    const usuario = await Usuario.findOne( {email});
    
    if( usuario ){
        return res.status(400).json({
            ok:false,
            msg:'Usuario existe'
        });
    }

    //Crear usuario con el modelo

    const dbusuario = new Usuario(req.body);

    //encriptar la pass hash
    const salt = bcrypt.genSaltSync();
    dbusuario.password = bcrypt.hashSync( password, salt );

    //generar JWT

    const token = await generarJWT(dbusuario.id, name);
    
    //Crear Usuario de BD
    await dbusuario.save();

    //generar respuesta exito(BORRAR EN PRODUCCION)

    return res.status(201).json({
        ok: true,
        uid: dbusuario.id,
        name: dbusuario.name,
        email: dbusuario.email,
        token
    })

        
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Algo salió mal'
        });
        
    }

    
}*/
const loginUsuarioAdmin = async(req,res = response) => {
    const{ email, password }= req.body;

    //verificar mail y pass

    try {

        const dbusuario = await usuarioModel.findOne({ where: { email: email, rol: 'ROL_ADMIN'} });

        console.log("hello")
        if( !dbusuario ){
            return res.status(400).json({
                ok: false,
                msg: "correo o contraseña incorrectos" //no existe mail
            })
        }

        const validPassword = bcrypt.compareSync( password, dbusuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: "correo o contraseña incorrectos" //pass incorrecta
            })
        }

        if( dbusuario.rol != 'ROL_ADMIN'){
            return res.status(400).json({
                ok: false,
                msg: "No permiso" //pass incorrecta
            })
        }



        //generar jwt
        
        const token = await generarJWT(dbusuario.uid,dbusuario.name, dbusuario.email, dbusuario.rol);
  
        // respuesta(BORRAR EN MODO PRODUCCION)

        return res.status(201).json({
            ok: true,
            id: dbusuario.id,
            name: dbusuario.name,
            email: dbusuario.email,
            rol: dbusuario.rol,
            token
        })
        
    } catch (error) {

        console.log(error)
        return res.json({
            ok: false,
            msg: "Error en la conexion con la BD"
        });
    }

}

const loginUsuario = async(req,res = response) => {
    const{ email, password }= req.body;

    //verificar mail y pass

    try {

        const dbusuario = await usuarioModel.findOne({ where: { email: email} });


        if( !dbusuario ){
            return res.status(400).json({
                ok: false,
                msg: "correo o contraseña incorrectos" //no existe mail
            })
        }

        if(dbusuario.rol == "INACTIVO"){
            console.log(dbusuario)

            return res.status(400).json({
                ok: false,
                msg: "cuenta no activada, actívala desde el enlace que enviamos a tu correo" //no existe mail
            })  
        }

        const validPassword = bcrypt.compareSync( password, dbusuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: "correo o contraseña incorrectos" //pass incorrecta
            })
        }

        
        //generar jwt
        
        const token = await generarJWT(dbusuario.uid,dbusuario.name, dbusuario.email, dbusuario.rol);
  
        // respuesta(BORRAR EN MODO PRODUCCION)

        return res.status(201).json({
            ok: true,
            id: dbusuario.id,
            name: dbusuario.name,
            email: dbusuario.email,
            rol: dbusuario.rol,
            token
        })
        
    } catch (error) {

        console.log(error)
        return res.json({
            ok: false,
            msg: "Error en la conexion con la BD"
        });
    }

}


const revalidarToken = async(req, res = response ) => {

    const { name,email } = req;

    console.log("llegada : ")
    console.log(email)


    // Leer la base de datos
    const dbUser = await usuarioModel.findOne({ where: { email: email} });

    console.log(dbUser)

    // Generar el JWT
    const token = await generarJWT( dbUser.uid, dbUser.name, dbUser.email, dbUser.rol );

    return res.json({
        ok: true,
        id: dbUser.id,
        uid: dbUser.uid,
        name: dbUser.name,
        email: dbUser.email,
        rol: dbUser.rol,
        token
    });

}

const revalidarTokenAdmin = async(req, res = response ) => {

    const { name,email } = req;

    console.log("llegada : ")
    console.log(email)


    // Leer la base de datos
    const dbUser = await usuarioModel.findOne({ where: { email: email} });

    console.log(dbUser)

    // Generar el JWT
    const token = await generarJWT( dbUser.uid, dbUser.name, dbUser.email, dbUser.rol );

    if(dbUser.rol != "ROL_ADMIN"){
        return res.json({
            ok: false
        }); 
    }else{

    return res.json({
        ok: true,
        id: dbUser.id,
        uid: dbUser.uid,
        name: dbUser.name,
        email: dbUser.email,
        rol: dbUser.rol,
        token
    });

}

}



module.exports = {
    crearUsuario,
    getUsuario,
    loginUsuario,
    loginUsuarioAdmin,
    revalidarToken,
    revalidarTokenAdmin,
    loginGoogle,
    activarUsuario,
    recuperacionUsuario,
    restablecerPassword
    
}