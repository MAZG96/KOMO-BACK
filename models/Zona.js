const Sequelize = require('sequelize');
const db = require('../db/config');

const zonaModel = db.define('zona', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    provincia: {
      type: Sequelize.STRING
    },
    cp_inicio: {
      type: Sequelize.STRING
    },
    cp_fin: {
      type: Sequelize.STRING
    }
  });
  
  zonaModel.sync().then(() => {
  });
  module.exports = zonaModel;