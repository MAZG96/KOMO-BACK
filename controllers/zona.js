const { response } = require("express");
const zonaModel = require("../models/Zona");
const { Op } = require("sequelize");




//POST
const insertarZona = (req, res) => {
  const { nombre, provincia,direccion, horario } = req.body;

  
  zonaModel.create({
    nombre,
    provincia,
    direccion,
    horario
  })
    .then(zona => res.send(zona));
}




const listarZona = (req, res) => {
  zonaModel.findAll({

    order: [
      ['id', 'DESC'],

  ]

  }
  )
    .then(zonas => 
      res.json(zonas))
    .catch(err => res.json({ error: err }))
    
}


const getZona = (req, res) => {
  zonaModel.findOne({
    where: {
      id: req.params.id,
    }
  })
    .then(zona => 
      res.json(zona))
    .catch(err => res.json({ error: err }))
    
}

const listarZonasProvincia = (req,res) => {
  
  zonaModel.findAll({
    where: {
      provincia: req.params.provincia,
    }
  })
    .then(zonas => 
      res.json(zonas))
    .catch(err => res.json({ error: err }))
}



const updateZona = (req, res) => {
  const { nombre, direccion, horario, provincia } = req.body;

  console.log(req.body);

  zonaModel.update(
  {
    nombre,
    provincia,
    direccion,
    horario
  },
  {
  where: {id: req.params.id}
    
  })
    .then(zona => res.send(zona));
}


const deleteZona = (req, res) => {
  zonaModel.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(zona => res.json("zona eliminada"));
  }

module.exports = {
  listarZona,
  insertarZona,
  getZona,
  listarZonasProvincia,
  deleteZona,
  updateZona
};