const { response } = require("express");
const favoritoModel = require("../models/Favorito");
const { Op } = require("sequelize");




const insertarFavorito = (req, res) => {
  const { id_productor,id_usuario } = req.body;

  favoritoModel.create({
    id_usuario,
    id_productor
  })
    .then(favorito => res.send(favorito));
}



const listarFavoritoUsuario = (req, res) => {
  favoritoModel.findAll({
    where: {
      id_usuario: req.params.id_usuario,
    }
  })
    .then(favoritos =>
      res.json(favoritos))
    .catch(err => res.json({ error: err }))

}

const listarFavorito = (req, res) => {
  favoritoModel.findAll()
    .then(favoritos =>
      res.json(favoritos))
    .catch(err => res.json({ error: err }))

}

const getFavorito = (req, res) => {
  favoritoModel.findOne({
    where: {
      id_productor: req.params.id_productor,
      id_usuario: req.params.id_usuario,
    }
  })
    .then(favorito =>
      res.json(favorito))
    .catch(err => res.json({ error: err }))

}



const deleteFavorito = (req, res) => {
  favoritoModel.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then(favorito => res.json("favoritos"));
}



module.exports = {
  listarFavorito,
  listarFavoritoUsuario,
  insertarFavorito,
  getFavorito,
  deleteFavorito,
};