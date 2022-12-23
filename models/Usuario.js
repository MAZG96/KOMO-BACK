const Sequelize = require('sequelize');
const db = require('../db/config');

const usuarioModel = db.define('usuarios', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    rol: {
      type: Sequelize.STRING
    }
    
  });
  
  usuarioModel.sync().then(() => {
  });
  module.exports = usuarioModel;