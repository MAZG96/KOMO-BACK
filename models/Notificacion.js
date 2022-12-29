const Sequelize = require('sequelize');
const db = require('../db/config');

const notificacionModel = db.define('notificaciones', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    endpoint: {
      type: Sequelize.STRING
    },
    expirationTime: {
        type: Sequelize.STRING
      },
    p256dh: {
    type: Sequelize.STRING
    },
    auth: {
        type: Sequelize.STRING
    },
    id_usuario: {
      type: Sequelize.INTEGER
    }
  });
  
  notificacionModel.sync().then(() => {
  });
  module.exports = notificacionModel;