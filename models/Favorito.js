const Sequelize = require('sequelize');
const db = require('../db/config');

const favoritoModel = db.define('favoritos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_productor: {
      type: Sequelize.INTEGER
    },
    id_usuario: {
      type: Sequelize.INTEGER
    }
  });
  
  favoritoModel.sync().then(() => {
  });
  module.exports = favoritoModel;