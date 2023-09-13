const Sequelize = require('sequelize');
const db = require('../db/config');

const InfousuarioModel = db.define('info_usuarios', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    nombre_empresa: {
      type: Sequelize.STRING
    },
    ubicacion: {
      type: Sequelize.STRING
    },
    coord_x: {
      type: Sequelize.STRING
    },
    coord_y: {
      type: Sequelize.STRING
    },
    foto: {
      type: Sequelize.STRING
    },
    calle: {
      type: Sequelize.STRING
    },
    piso: {
      type: Sequelize.STRING
    },
    horario: {
        type: Sequelize.STRING
    },
    recogida: {
      type: Sequelize.INTEGER
    },
    pago_recogida: {
      type: Sequelize.INTEGER
    },
    foto: {
      type: Sequelize.STRING
    },
    id_usuario: {
      type: Sequelize.INTEGER
    },
    zona: {
      type: Sequelize.INTEGER
    },
    pregunta1: {
      type: Sequelize.STRING
    },
    pregunta2: {
      type: Sequelize.STRING
    },
    cp_envio: {
      type: Sequelize.STRING
    },
    telefono_envio: {
      type: Sequelize.STRING
    },
    certificado: {
      type: Sequelize.STRING
    },
    envio_frio: {
      type: Sequelize.INTEGER
    },
    envio_individual: {
      type: Sequelize.INTEGER
    },
    dias_publicados: {
      type: Sequelize.STRING
    },
  });

  
  InfousuarioModel.sync().then(() => {
  });
  module.exports = InfousuarioModel;