const Sequelize = require('sequelize');
const db = require('../db/config');

const pedidoModel = db.define('pedidos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    apellidos: {
      type: Sequelize.STRING
    },
    calle: {
      type: Sequelize.STRING
    },
    piso: {
      type: Sequelize.STRING
    },
    localidad: {
        type: Sequelize.STRING
    },
    provincia: {
        type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    codigo_postal: {
      type: Sequelize.STRING
    },  
    total:{
      type: Sequelize.FLOAT
    },
    id_usuario: {
      type: Sequelize.INTEGER
    }
  });
  
  pedidoModel.sync().then(() => {
  });
  module.exports = pedidoModel;