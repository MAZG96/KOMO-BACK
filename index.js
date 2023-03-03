const express = require('express');
const cors = require('cors');
//const { dbConnection, con } = require('./db/config');
const morgan = require('morgan');
const myConnection = require('express-myconnection');
const mysql = require('mysql');

//subir imagen
const fileUpload = require("express-fileupload");
const path = require("path");
const { addHeaders } = require('./middlewares/add-headers');
const sharp = require("sharp");
const db = require('./db/config');
const  Webpush  = require('web-push');

const app = express();


const stripe = require('stripe')
('sk_test_51LskiFJXPK7Bx9nFbzjJ8LQGGJj3eFaX6IVAM2HKJ2wbFfPBNvi3h7vEkzu8beW3EUKZydkUv3GVOiD4DCcfxfaQ00hhRhvfGo');



const vapidKeys = {
  "publicKey": "BH5tNir_8CtqgFqUP7guHteWFBB6S_FO_T1WoTKz9cTST9vBBfsy9ae58u3Bfb34OR7EqP85ri5kLwRCgdAT25M",
  "privateKey": "H7OHi99T4MY4RXQjYxdmvVnDOBVfr1I1mUKtguoellc"
}


Webpush.setVapidDetails(
  'mailto:miguelzara96@outlook.es',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

//-------------HELPERS----------//

const handlerResponse = (res, data, code = 200) => {
  res.status(code).send(data)
}

//-----------CONTROLADORES-----------//

const savePush = (req,res) => {
  let tokenBrowser = req.body.token;

  let data = JSON.stringify(tokenBrowser, null, 2);

  console.log("guardado: "+data);

  //guardar en BD
}

const sendPush = (req,res) => {
  const payload = {
    "notification": {
      "title": "TITULO DE LA NOTIFICACION",
      "body": "CUERPO",
      "vibrate": [100,50,100],
      "image": "https://komolocalfoods.com/assets/productos/komo-logo.png",
      "actions": [{
        "action": "explore",
        "title": "HOLA"
      }]
    }
  }

  const token = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fUlMiP2E3fE:APA91bGl3RAEaONuIrluCtlLNaqrU22Nv3g0e2LbWBwojjS7vpER3uTjgsjzYEiQoFzrdo9og4pyJ6vhE-i7A7w8kZSUE_ijFktc4uN9JQBSPlaor8t_tvI6POoSxOqW1mlB0WWWvqwg",
    "expirationTime": null,
    "keys": 
    {
      "auth": "Sz8iz-_bYakd11eJj-BMaQ",
      "p256dh": "BOXTVPW4HksPdHvFTtpK-7AQ9Z8zrTmWL8meWpRtQwf83TuT7rxK44DJYD5tsBHvykuNzPmxrg31UE2C3-G_UD0"
    }
  }

  //const tokenParse = JSON.parse();

  Webpush.sendNotification(
    token,
    JSON.stringify(payload))
    .then(res => {
      console.log(enviado);
    }).catch ( err => {
      console.log("USUARIO SIN PERMISOS, KEYS MAL");
    })

    res.status(200).send("hola")
  }


app.route('/send').post(sendPush);


//Crear el servidor/aplicacion de express



app.use(function (req, res, next) {

  var allowedDomains = ['https://thunderous-pithivier-77dcc0.netlify.app', 'http://localhost:4200', 'https://komolocalfoods.com' ];
  var origin = req.headers.origin;
  console.log(origin);
  if(allowedDomains.indexOf(origin) > -1){

    
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Website you wish to allow to connect
  /*res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  //res.setHeader('Access-Control-Allow-Origin', ['https://thunderous-pithivier-77dcc0.netlify.app', 'http://localhost:4200']);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);*/

  // Pass to next layer of middleware
  next();
});

var whitelist = ['https://thunderous-pithivier-77dcc0.netlify.app', 'http://localhost:4200', 'https://komolocalfoods.com' ];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//CORS
app.use( cors(corsOptionsDelegate) );

require('dotenv').config();




//CONEXION BD MONGODB

/*const mongoose = require('mongoose');

mongoose.connect(process.env.BD_CNN);

module.exports = mongoose;*/




//CONEXION BD MYSQL

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))


/*
try {

    app.use(morgan('dev'));
    app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'playasykomo'
    }, 'single'));
    
} catch (error) {
    
}*/

//subir imagen

app.use(
    fileUpload()
);

app.use('/files', express.static('files'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "inde.html"));
});

app.post("/upload",addHeaders ,async (req, res) => {


    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
      }
    
      const file = req.files.archivo;
      const path = "files/"+req.body.nombre;

      console.log("path: "+path);

    
      file.mv(path, async (err) => {
        if (err) {
          console.log("path: "+path);
          console.log("err: "+err);

          

          return res.status(500).send(err);
        }

        await sharp(path)
        .rotate()
        .resize({
          width: 400,
        })
        .jpeg({ progressive: true, force: false })
        .toFile(path+".jpg");

        return res.send({ status: "success", path: path });
      });
      
  });

  app.post("/upload/user",addHeaders ,async (req, res) => {


    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
      }
    
      const file = req.files.archivo;
      const path = "files/profile/"+req.body.nombre;

      console.log("path: "+path);

    
      file.mv(path, async (err) => {
        if (err) {
          console.log("path: "+path);
          console.log("err: "+err);

          

          return res.status(500).send(err);
        }

        await sharp(path)
        .rotate()
        .resize({
          width: 400,
        })
        .jpeg({ progressive: true, force: false })
        .toFile(path+".jpg");

        return res.send({ status: "success", path: path });
      });
      
  });


  







//Directorio publico (public)

app.use(express.static('public'));


// Add headers before the routes are defined





//Lectura y parseo del BODY
app.use( express.json() );





app.post('/api/stripe_checkout', async (req,res) => {


  const {stripeToken, cantidad, email} = req.body;
 

  const cantidadinEur = Math.round(cantidad * 100);
  const chargeObject =  await stripe.charges.create({
    amount: cantidadinEur,
    currency: 'eur',
    source: stripeToken,
    capture: false,
    description: 'Pago KOMOLOCALFOODS',
    receipt_email: email,

  });

  console.log(chargeObject.id);


  //Agregar transacción a la BD

  //COMPROBACIONES SOBRE EL PAGO
  try{
    await stripe.charges.capture(chargeObject.id);
    res.json(chargeObject);
  }catch(error){
    await stripe.refunds.create({charge: chargeObject.id});
    res.json(chargeObject);
  }

});

// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos/', require('./routes/producto'));
app.use('/api/pedidos/', require('./routes/pedido'));
app.use('/api/info-pedidos/', require('./routes/info-pedido'));
app.use('/api/item-pedidos/', require('./routes/item-pedido'));
app.use('/api/info-usuario', require('./routes/info-usuario'));
app.use('/api/comentarios/', require('./routes/comentario'));
app.use('/api/favoritos/', require('./routes/favorito'));
app.use('/api/zonas/', require('./routes/zona'));
app.use('/api/notificaciones/', require('./routes/notificacion'));
app.use('/api/ups/', require('./routes/ups'));






app.listen( process.env.PORT, async () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
    
    await stripe.applePayDomains.create({
      domain_name: 'komolocalfoods.com',
    });
});
