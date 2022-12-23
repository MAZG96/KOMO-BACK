const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const dbConfig = require('./db.config.js');


dotenv.config();

  
module.exports =  new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});