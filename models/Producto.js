const Sequelize = require('sequelize');
const db = require('../db/config');

const productoModel = db.define('productos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.FLOAT
    },
    cantidad: {
      type: Sequelize.STRING
    },
    peso_total: {
      type: Sequelize.FLOAT
    },
    stock: {
      type: Sequelize.INTEGER
    },
    foto: {
        type: Sequelize.STRING
    },
    dias_publicados: {
        type: Sequelize.STRING
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    id_usuario: {
      type: Sequelize.INTEGER
    },
  });
  
  productoModel.sync().then(() => {
  });
  module.exports = productoModel;