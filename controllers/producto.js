const { response } = require("express");
const productoModel = require("../models/Producto");
const { Op, Sequelize } = require("sequelize");



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

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];

const insertarProducto = (req, res) => {
  const { nombre, descripcion, precio ,peso_total,cantidad,stock ,foto, dias_publicados, id_categoria,id_usuario } = req.body;

  console.log(req.body);
  
  productoModel.create({
    nombre,
    descripcion,
    precio,
    peso_total,
    cantidad,
    stock,
    foto,
    dias_publicados,
    id_categoria,
    id_usuario
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


const listarProducto = (req, res) => {
  productoModel.findAll({
    where: {
    dias_publicados: {
      [Op.like]: '%'+day+'%' //comprobar fecha que se puede comprar
    }
   },
   order: [
    Sequelize.literal('rand()')
  ]
  })
    .then(productos => 
      res.json(productos))
    .catch(err => res.json({ error: err }))
    
}

const listarProductoUsuario = (req, res) => {
  productoModel.findAll({
    where: {
      id_usuario: req.params.id_usuario,
    }
  })
    .then(productos => 
      res.json(productos))
    .catch(err => res.json({ error: err }))
    
}


const listarSugerenciasProductos = (req, res) => {
  productoModel.findAll({
    where: {
      nombre: {
        //[Op.like]: '%'+day+'%' //comprobar fecha que se peude comprar
        [Op.like]: '%'+req.params.q+'%'

      },
      dias_publicados: {
        [Op.like]: '%'+day+'%' //comprobar fecha que se peude comprar
      }

   },
   order: [
    Sequelize.literal('rand()')
  ],
   limit: 12,
  })
    .then(productos => 
      res.json(productos))
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

const getProducto = (req, res) => {
  productoModel.findAll({
    where: {
      id: req.params.id,
    }
  })
    .then(producto => 
      res.json(producto[0]))
    .catch(err => res.json({ error: err }))
    
}

const listarProductosCategorias = (req,res) => {
  
  productoModel.findAll({
    where: {
      id_categoria: req.params.id,
      dias_publicados: {
        [Op.like]: '%'+day+'%' //comprobar fecha que se peude comprar
      }
    }
  })
    .then(productos => 
      res.json(productos))
    .catch(err => res.json({ error: err }))
}

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

const updateProducto = (req, res) => {
  const { nombre, descripcion, precio ,peso_total,cantidad,stock ,foto, dias_publicados, id_categoria,id_usuario } = req.body;

  console.log(req.body);

  productoModel.update(
  {
    nombre,
    descripcion,
    precio,
    peso_total,
    cantidad,
    stock,
    foto,
    peso_total,
    cantidad,
    dias_publicados,
    id_categoria,
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

const deleteProducto = (req, res) => {
  productoModel.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(producto => res.json("productos"));
  }

module.exports = {
  listarProducto,
  insertarProducto,
  getProducto,
  listarSugerenciasProductos,
  listarProductoUsuario,
  listarProductosCategorias,
  deleteProducto,
  updateProducto
};