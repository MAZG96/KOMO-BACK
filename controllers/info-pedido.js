const { response } = require("express");
const InfopedidoModel = require("../models/Info-pedido");
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

const insertarInfoPedido = (req, res) => {
  const { nombre, apellidos, calle, piso ,localidad, provincia,codigo_postal, telefono,id_usuario,email } = req.body;

  console.log(req.body)

  InfopedidoModel.create({
    nombre,
    apellidos,
    calle,
    piso,
    localidad,
    provincia,
    telefono,
    email,
    codigo_postal,
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


const getInfoPedido = (req, res) => {
  console.log(req.params.id_usuario)

  InfopedidoModel.findAll({
    where: {
      id_usuario: req.params.id_usuario,
    }
  })
    .then(pedido => {
      res.json(pedido[0])
    }
      )
      
    .catch(err => res.json({ error: err }))
    
}


const updateInfoPedido = (req, res) => {
  const { nombre, apellidos, calle, piso ,localidad, provincia,codigo_postal, telefono,id_usuario,email } = req.body;

  

  InfopedidoModel.update({
    nombre,
    apellidos,
    calle,
    piso,
    localidad,
    provincia,
    telefono,
    email,
    codigo_postal,
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
  insertarInfoPedido,
  getInfoPedido,
  updateInfoPedido
};