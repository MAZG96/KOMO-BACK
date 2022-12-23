const { response } = require("express");
const comentarioModel = require("../models/Comentario");
const { Op } = require("sequelize");



/*const insertarcomentario = async(req,res = response) => { 
  const data = req.body;

  if( data.foto != ""){
    data.foto= data.foto.toLocaleLowerCase();
  }

  data.fecha_creacion = new Date(Date.now()).toLocaleDateString();
  req.getConnection((err, conn) => {
  conn.query('INSERT INTO comentarios SET ?', data , (err, comentarios) => {
    if (err) {
      res.json(err);
    }
    res.json(comentarios);
    });
  });
};*/


const insertarComentario = (req, res) => {
  const { texto,valoracion,id_usuario,estado,id_producto,id_productor } = req.body;

  
  comentarioModel.create({
    texto,
    valoracion,
    estado,
    id_usuario,
    id_productor,
    id_producto
  })
    .then(comentario => res.send(comentario));
}



/*const listarcomentario = async(req,res = response) => req.getConnection((err, conn) => {
  conn.query('SELECT * FROM comentarios', (err, comentarios) => {
   if (err) {
    res.json(err);
   }
    res.json(comentarios)  
  });

});*/

const listarComentarioProducto = (req, res) => {
  comentarioModel.findAll({
    where: {
      id_producto: req.params.id_producto,
      estado: 'publicado'
    }
  })
    .then(comentarios =>
      res.json(comentarios))
    .catch(err => res.json({ error: err }))

}

const listarComentarioProductor = (req, res) => {
  comentarioModel.findAll({
    where: {
      id_productor: req.params.id_productor,
      estado: 'publicado'
    }
  })
    .then(comentarios =>
      res.json(comentarios))
    .catch(err => res.json({ error: err }))

}
const listarComentario = (req, res) => {
  comentarioModel.findAll({
    order: [
      ['id', 'DESC'],
  ]
  })
    .then(comentarios =>
      res.json(comentarios))
    .catch(err => res.json({ error: err }))

}





/*
const getcomentario = async(req,res = response) => {
  const {id} = req.params;  

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM comentarios WHERE id = ?',id, (err, comentario) => {
    if (err) {
      res.json(err);
    }
      res.json(comentario[0])  
    });

  });
};*/

const getComentario = (req, res) => {
  comentarioModel.findAll({
    where: {
      id: req.params.id,
    }
  })
    .then(comentario =>
      res.json(comentario[0]))
    .catch(err => res.json({ error: err }))

}

const listarComentariosCategorias = (req, res) => {

  comentarioModel.findAll({
    where: {
      id_categoria: req.params.id,
    }
  })
    .then(comentarios =>
      res.json(comentarios))
    .catch(err => res.json({ error: err }))
}

/*
const updatecomentario = async(req,res = response) => { 
  const {id} = req.params; 
  const data = req.body;
  
  if(data.foto.includes("http://localhost:4000/files/")){

  }else{
    data.foto= "http://localhost:4000/files/"+data.foto.toLocaleLowerCase();
  }
  data.fecha_creacion = new Date(Date.now()).toLocaleDateString();
  req.getConnection((err, conn) => {
  conn.query('UPDATE comentarios SET ? WHERE id = ?', [data,id] , (err, comentarios) => {
    if (err) {
      res.json(err);
    }
    res.json("comentario editado con éxito");
  });
  });
};*/

const updateComentario = (req, res) => {
  const { texto, valoracion, id_productor, id_producto, id_usuario, estado } = req.body;

  console.log(estado);

  comentarioModel.update(
    {
      texto,
      valoracion,
      id_producto,
      id_productor,
      id_usuario,
      estado
    },
    {
      where: { id: req.params.id }

    })
    .then(comentario => res.send(comentario));
}


/*

const deletecomentario = async(req,res = response) => {
  const {id} = req.params; 

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM comentarios WHERE id = ?',[id], (err, comentario) => {
    if (err) {
      res.json(err);
    }
      res.json("comentario eliminado con éxito");
    

    });

  });
};*/

const deleteComentario = (req, res) => {
  comentarioModel.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(comentario => res.json("comentarios"));
}

module.exports = {
  listarComentario,
  listarComentarioProducto,
  listarComentarioProductor,
  insertarComentario,
  getComentario,
  deleteComentario,
  updateComentario
};