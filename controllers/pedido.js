const { response } = require("express");
const pedidoModel = require("../models/Pedido");
const { sequelize } = require('sequelize');
const itemPedidoModel = require("../models/Item-pedido");
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
  listarPedidoUsuario,
  listarDatosGrafica,
  updatePedido
};