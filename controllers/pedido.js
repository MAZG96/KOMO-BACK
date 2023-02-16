const { response } = require("express");
const pedidoModel = require("../models/Pedido");
const { sequelize } = require('sequelize');
const itemPedidoModel = require("../models/Item-pedido");
var hbs = require('nodemailer-express-handlebars');
const { Op } = require("sequelize");



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

const insertarPedido = (req, res) => {
  const { nombre, apellidos, calle, piso ,localidad, provincia,codigo_postal, telefono,id_usuario,email,total } = req.body;

  console.log(req.body)

  pedidoModel.create({
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
  })
  .then(pedido=> 
    {res.send(pedido);
      
      
});
  /*.then(pedido => {
          
    console.log(res)
    
});*/
}



/*const listarProducto = async(req,res = response) => req.getConnection((err, conn) => {
  conn.query('SELECT * FROM productos', (err, productos) => {
   if (err) {
    res.json(err);
   }
    res.json(productos)  
  });

});*/

const listarPedido = (req, res) => {
  pedidoModel.findAll({
    order: [
      ['id', 'DESC'],
    ]
  })
    .then(pedidos => 
      res.json(pedidos))
    .catch(err => res.json({ error: err }))
    
}

const listarPedidoUsuario = (req, res) => {
  pedidoModel.findAll({
    where: {
      id_usuario: req.params.id_usuario,
    },
    order: [
      ['id', 'DESC'],
    ]
  })
    .then(pedidos => 
      res.json(pedidos))
    .catch(err => res.json({ error: err }))
    
}


const listarDatosGrafica = async (req, res) => {


  let ventas;
  
  ventas = await pedidoModel.sequelize.query('SELECT COUNT(*) ventas, MONTH(createdAt) Mes FROM `pedidos` GROUP BY MONTH(createdAt)', {
    type: pedidoModel.sequelize.QueryTypes.SELECT
  });

  return res.status(200).json(ventas)
    
}


const notificar_pedido = (req, res) => {

  const pedido = req.body;


  itemPedidoModel.findAll({
    where: {
      id_pedido: pedido.id,
    },
    raw: true,
  })
    .then(cart => {

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
      estado: pedido.estado,
      createdAt: pedido.createdAt,
      id: pedido.id,
      id_usuario: pedido.id_usuario,
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

  return res.status(200).json(cart)
    })
    
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
    res.json("producto editado con éxito");
  });
  });
};*/

const updatePedido = (req, res) => {
  const { nombre, apellidos, calle, piso ,localidad, provincia,codigo_postal,estado, telefono,id_usuario,email,total } = req.body;

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
    estado,
    id_usuario
  },
  {
  where: {id: req.params.id}
    
  })
    .then(pedido => res.send(pedido));
}


/*

const deleteProducto = async(req,res = response) => {
  const {id} = req.params; 

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM productos WHERE id = ?',[id], (err, producto) => {
    if (err) {
      res.json(err);
    }
      res.json("producto eliminado con éxito");
    

    });

  });
};*/


module.exports = {
  listarPedido,
  insertarPedido,
  getPedido,
  notificar_pedido,
  listarPedidoUsuario,
  listarDatosGrafica,
  updatePedido
};