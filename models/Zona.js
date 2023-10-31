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
    horario: {
      type: Sequelize.STRING
    },
    direccion: {
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
    },
    tipo: {
      type: Sequelize.STRING
    },
    notas_productor: {
      type: Sequelize.STRING
    },
    notas_comprador: {
      type: Sequelize.STRING
    }
  });
  
  zonaModel.sync().then(() => {
  });
  module.exports = zonaModel;