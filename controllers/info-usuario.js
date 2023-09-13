const { response } = require("express");
const infoUsuarioModel = require("../models/Info-usuario");
const { Op, Sequelize } = require("sequelize");
const path = require("path");
var fs = require('fs');




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
    piso, horario, certificado, cp_envio, telefono_envio, pregunta1, pregunta2, envio_frio, dias_publicados, envio_individual} = req.body;

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
    certificado,
    cp_envio,
    telefono_envio,
    pregunta1,
    pregunta2,
    envio_frio, 
    envio_individual,
    dias_publicados
  })
    .then(producto => res.send(producto));
}


const subir_documento = async (req, res) => {


  if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
  
    console.log(req.files)
    const file = req.files.archivo;
    const path = "files/documentacion/"+req.body.nombre;

    console.log("path: "+path);

  
    file.mv(path, async (err) => {
      if (err) {
        console.log("path: "+path);
        console.log("err: "+err);

        

        return res.status(500).send(err);
      }


      fs.rename(path, path+".pdf", function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });

      return res.send({ status: "success", path: path });

    });
    
  }

  const updateDocURL = (req, res) => {
    const {certificado} = req.body;
  
      infoUsuarioModel.update({
      certificado,
      },
      {
    
      where: {id: req.params.id}
        
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


const listarSugerenciasProductores = (req, res) => {
  infoUsuarioModel.findAll({
    where: {
      nombre_empresa: {
        //[Op.like]: '%'+day+'%' //comprobar fecha que se peude comprar
        [Op.like]: '%'+req.params.q+'%'

      }

   },
   order: [
    Sequelize.literal('rand()')
  ],
   limit: 12,
  })
    .then(infousuarios => 
      res.json(infousuarios))
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
  const { nombre, nombre_empresa, ubicacion, coord_x, coord_y,foto,id_usuario,recogida, pago_recogida, zona, calle, 
    piso, horario, certificado, cp_envio, telefono_envio, pregunta1, pregunta2, envio_frio, dias_publicados, envio_individual} = req.body;

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
    certificado,
    cp_envio,
    telefono_envio,
    pregunta1,
    pregunta2,
    envio_frio, 
    envio_individual,
    dias_publicados
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
  subir_documento,
  insertarInfoUsuario,
  updateInfoUsuario,
  updateDocURL,
  listarSugerenciasProductores
};