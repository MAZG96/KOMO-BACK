const Sequelize = require('sequelize');
const db = require('../db/config');

const itemPedidoModel = db.define('item-pedidos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cantidad: {
      type: Sequelize.INTEGER
    },
    foto: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.STRING
    },
    nombre: {
      type: Sequelize.STRING
    },
    id_producto: {
      type: Sequelize.INTEGER
    },
    id_productor: {
      type: Sequelize.INTEGER
    },
    id_pedido: {
      type: Sequelize.INTEGER
    },
    pago_recogida: {
      type: Sequelize.INTEGER
    },
    recogida: {
      type: Sequelize.STRING,
    },
  });
  
  itemPedidoModel.sync().then(() => {
  });
  module.exports = itemPedidoModel;