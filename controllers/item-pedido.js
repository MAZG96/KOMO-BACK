const { response } = require("express");
const itemPedidoModel = require("../models/Item-pedido");
const pedidoModel = require("../models/Pedido");
const infousuarioModel = require("../models/Info-usuario");
const usuarioModel = require("../models/Usuario");
var hbs = require('nodemailer-express-handlebars');
const InfousuarioModel = require("../models/Info-usuario");
const Ftp = require( 'ftp' );



/*const insertarProducto = async(req,res = response) => { 
  const data = req.body;

  if( data.foto != ""){
    data.foto= data.foto.toLocaleLowerCase();
  }

  data.fecha_creacion = new Date(Date.now()).toLocaleDateString();
  req.getConnection((err, conn) => {
  conn.query('INSERT INTO productos SET ?', data , (err, productos) => {
    if (err) {
      res.json(err);
    }
    res.json(productos);
    });
  });
};*/

// Insert into table

const insertarItemPedido = (req, res) => {
  const { id,foto,id_producto } = req.body;

  const cart = req.body;

  console.log(cart)



  
  for (var _i = 0; _i < cart.length; _i++){
    
  itemPedidoModel.create({
    nombre: cart[_i].nombre,
    precio: cart[_i].precio,
    cantidad: cart[_i].cantidad,
    foto: cart[_i].foto,
    id_producto: cart[_i].id_producto,
    id_pedido: cart[_i].id_pedido,
    id_productor: cart[_i].id_productor,
    recogida: cart[_i].recogida,
    pago_recogida: cart[_i].pago_recogida,
    })
  }

      pedidoModel.findOne({
        where: {
          id: cart[0].id_pedido,
        }
      })
        .then(pedido => {

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
        viewPath: 'views/email',
        extName: '.hbs',
        defaultLayout: null
      }));

      var productos = "";
      var producto;
      for (producto in cart) {
        productos += "<div  style='padding: 10px; border: 1px solid black'>"
        + "<p>" + cart[producto].nombre + "<p>"       
        + "</div>";
      }


      var mailOptions = {
        from: 'hola@komolocalfoods.com',
        to: pedido.email,
        subject: 'Pedido KOMO',
        template: 'recover',
        context: {
          nombre: pedido.nombre,
          apellidos: pedido.apellidos,
          calle: pedido.calle,
          piso: pedido.piso,
          localidad: pedido.localidad,
          provincia: pedido.provincia,
          telefono: pedido.telefono,
          email: pedido.email,
          codigo_postal: pedido.codigo_postal,
          total: pedido.total,
          createdAt: pedido.createdAt,
          id: pedido.id,
          productos: cart
        }
      };

      console.log(cart);

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });

        })

      
 

  return res.status(201).json({
    ok: true
  });
}
  /*.then(pedido => {
          
    console.log(res)
    return res.status(201).json({
      ok: true
  })
});*/


/*const listarProducto = async(req,res = response) => req.getConnection((err, conn) => {
  conn.query('SELECT * FROM productos', (err, productos) => {
   if (err) {
    res.json(err);
   }
    res.json(productos)  
  });

});*/

const listarPedido = (req, res) => {
  itemPedidoModel.findAll({
    
  })
    .then(pedidos => 
      res.json(pedidos))
    .catch(err => res.json({ error: err }))
    
}

const listarItemPedido = (req, res) => {
  itemPedidoModel.findAll({
    where: {
      id_pedido: req.params.id_pedido,
    }
  })
    .then(pedidos => 
      res.json(pedidos))
    .catch(err => res.json({ error: err }))
    
}

const listarItemPedidoUsuario = (req, res) => {
  itemPedidoModel.findAll({
    where: {
      id_productor: req.params.id_productor,
    }
  })
    .then(pedidos => 
      res.json(pedidos))
    .catch(err => res.json({ error: err }))
    
}



/*
const getProducto = async(req,res = response) => {
  const {id} = req.params;  

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM productos WHERE id = ?',id, (err, producto) => {
    if (err) {
      res.json(err);
    }
      res.json(producto[0])  
    });

  });
};*/

const getPedido = (req, res) => {
  pedidoModel.findAll({
    where: {
      id: req.params.id,
    }
  })
    .then(pedido => 
      res.json(pedido[0]))
    .catch(err => res.json({ error: err }))
    
}

const listarProductosSugerencias = async(req,res = response) => {
  const {q} = req.params[0];  

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM productos WHERE nombre = ?',[q], (err, producto) => {
    if (err) {
      res.json(err);
    }
      res.json(producto[0])  
    });

  });
};

/*
const updateProducto = async(req,res = response) => { 
  const {id} = req.params; 
  const data = req.body;
  
  if(data.foto.includes("http://localhost:4000/files/")){

  }else{
    data.foto= "http://localhost:4000/files/"+data.foto.toLocaleLowerCase();
  }
  data.fecha_creacion = new Date(Date.now()).toLocaleDateString();
  req.getConnection((err, conn) => {
  conn.query('UPDATE productos SET ? WHERE id = ?', [data,id] , (err, productos) => {
    if (err) {
      res.json(err);
    }
    res.json("producto editado con ??xito");
  });
  });
};*/

const updatePedido = (req, res) => {
  const { nombre, apellidos, calle, piso ,localidad, provincia,codigo_postal, telefono,id_usuario,email,total } = req.body;

  pedidoModel.update({
    nombre,
    apellidos,
    calle,
    piso,
    localidad,
    provincia,
    telefono,
    email,
    codigo_postal,
    total,
    id_usuario
  },
  {
  where: {id: req.params.id}
    
  })
    .then(producto => res.send(producto));
}




const pruebaSEUR = async (req, res) => {

    const cart = req.body;
    const ftpClient = new Ftp();

    let datos_recoger = "";

    var referencia = "KOMO-"+cart[0].id_productor+cart[0].id_pedido


    await infousuarioModel.findOne({
      where: {
        id_usuario: 2
      }
    })
      .then(infousuario => {

        datos_recoger = referencia+";"+infousuario.nombre_envio+";"+infousuario.direccion_envio+";"+infousuario.cp_envio
        +";"+infousuario.localidad_envio+";"+infousuario.telefono_envio;
      })
      .catch(err => res.json({ error: err }))

    await usuarioModel.findOne({
      where: {
        id: 46 //cart[0].id_productor
      }
    })
      .then(usuario => {
  
        datos_recoger = datos_recoger+";"+usuario.email;
        console.log("hello")

        
      })
      .catch(err => res.json({ error: err }))


    await pedidoModel.findOne({
      where: {
        id: 185, //cart[0].id_pedido
      }
    })
    .then(pedido => {

      datos_recoger = datos_recoger+";"+pedido.nombre+" "+pedido.apellidos+";"+pedido.calle;
      if(pedido.piso != ''){
        datos_recoger = datos_recoger+" "+pedido.piso;
      }
      datos_recoger = datos_recoger+";"+pedido.codigo_postal+";"+pedido.localidad+";"+pedido.telefono+";"+"ES"+";"+pedido.email
      +";"+"CODIGO_SERVICIO"+";"+"CODIGO_PRODUCTOS"+";"+cart.length+";"+"NUMERO_KILOS"

    })
    .catch(err => res.json({ error: err }))


  //var data = "First;Second";
  //data += "\r\nThird,Forth";

    //QUEDARIA KILOS Y BULTOS POR A??ADIR

    console.log(datos_recoger)

    var data = datos_recoger;

    ftpClient.on( 'ready', async function() {
      ftpClient.put( data, '/www/img/'+referencia+'.csv', async function( err, list ) {
        if ( err ) throw err;
        ftpClient.end();
      } );
    } );

    ftpClient.connect( {
      'host': 'ftp.cluster028.hosting.ovh.net',
      'user': 'playasy',
      'password': 'playasCONIL12'
    } );

    datos_recoger = "";

    return await res.status(200).json({
      ok: true,
      msg: "fichero subbido" //no existe mail
    }) 

}

/*

const deleteProducto = async(req,res = response) => {
  const {id} = req.params; 

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM productos WHERE id = ?',[id], (err, producto) => {
    if (err) {
      res.json(err);
    }
      res.json("producto eliminado con ??xito");
    

    });

  });
};*/


module.exports = {
  listarPedido,
  insertarItemPedido,
  getPedido,
  listarItemPedido,
  listarItemPedidoUsuario,
  updatePedido,
  pruebaSEUR
};