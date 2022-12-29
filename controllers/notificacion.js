const { response } = require("express");
const notificacionModel = require("../models/Notificacion");
const { Op } = require("sequelize");




//POST
const insertarNotificacion = (req, res) => {
  const { endpoint, expirationTime, keys, id_usuario } = req.body;

  const p256dh = keys.p256dh;
  const auth = keys.auth;

  notificacionModel.create({
    endpoint,
    expirationTime,
    p256dh,
    auth,
    id_usuario    
  })
    .then(notificacion => res.send(notificacion));
}

const updateNotificacion = (req, res) => {
  const { endpoint, expirationtime, p256dh, auth, id_usuario } = req.body;

  console.log("UPDATE")
  
  notificacionModel.update({
    endpoint,
    expirationtime,
    p256dh,
    auth,
    id_usuario
  },
  {
    where: {id_usuario: req.params.id_usuario}
      
  })
    .then(notificacion => res.send(notificacion));
}


const listarNotificacion = (req,res) => {
  
  notificacionModel.findAll()
    .then(notificaciones => 
      res.json(notificaciones))
    .catch(err => res.json({ error: err }))
}

const getNotificacion = (req,res) => {
  
  notificacionModel.findOne({
    where: {
      id_usuario: req.params.id_usuario
    }
  })
    .then(notificaciones => 
      res.json(notificaciones))
    .catch(err => res.json({ error: err }))
}



module.exports = {
  insertarNotificacion,
  updateNotificacion,
  listarNotificacion,
  getNotificacion
};