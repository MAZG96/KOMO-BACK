const { response } = require("express");
const infoUsuarioModel = require("../models/Info-usuario");
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

const insertarInfoUsuario = (req, res) => {
  const { nombre, nombre_empresa, ubicacion, coord_x, coord_y,foto,id_usuario,recogida, pago_recogida, zona, calle, 
    piso, horario, nombre_envio, cp_envio, telefono_envio, direccion_envio, localidad_envio} = req.body;

  infoUsuarioModel.create({
    nombre,
    nombre_empresa,
    ubicacion,
    coord_x,
    coord_y,
    foto,
    zona,
    calle, 
    piso,
    recogida,
    pago_recogida,
    horario,
    id_usuario,
    nombre_envio,
    cp_envio,
    telefono_envio,
    direccion_envio,
    localidad_envio
  })
    .then(producto => res.send(producto));
}



/*const listarProducto = async(req,res = response) => req.getConnection((err, conn) => {
  conn.query('SELECT * FROM productos', (err, productos) => {
   if (err) {
    res.json(err);
   }
    res.json(productos)  
  });

});*/

const listarInfoUsuarios= (req, res) => {
  infoUsuarioModel.findAll({
  })
    .then(productos => 
      res.json(productos))
    .catch(err => res.json({ error: err }))
    
}

const listarInfoUsuario = (req, res) => {
  infoUsuarioModel.findAll({
    where: {
      id_usuario: req.params.id_usuario,
    }
  })
    .then(productos => 
      res.json(productos[0]))
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

const updateInfoUsuario = (req, res) => {
    const { nombre, nombre_empresa, ubicacion, coord_x, coord_y,foto,id_usuario,recogida,pago_recogida, zona, calle, 
      piso, horario, nombre_envio, cp_envio, telefono_envio, direccion_envio, localidad_envio} = req.body;

    infoUsuarioModel.update({
      nombre,
      nombre_empresa,
      ubicacion,
      coord_x,
      coord_y,
      foto,
      zona,
      calle, 
      piso, 
      recogida,
      pago_recogida,
      horario,
      id_usuario,
      nombre_envio,
      cp_envio,
      telefono_envio,
      direccion_envio,
      localidad_envio
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
  listarInfoUsuarios,
  listarInfoUsuario,
  insertarInfoUsuario,
  updateInfoUsuario
};