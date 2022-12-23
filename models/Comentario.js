const Sequelize = require('sequelize');
const db = require('../db/config');

const comentarioModel = db.define('comentarios', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    texto: {
      type: Sequelize.STRING
    },
    valoracion: {
      type: Sequelize.INTEGER
    },
    estado: {
      type: Sequelize.STRING
    },
    id_producto: {
      type: Sequelize.INTEGER
    },
    id_productor: {
      type: Sequelize.INTEGER
    },
    id_usuario: {
      type: Sequelize.INTEGER
    },
    

  });
  
  comentarioModel.sync().then(() => {
  });
  module.exports = comentarioModel;