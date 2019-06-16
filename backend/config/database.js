const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database;

switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(
      connection.production.database,
      connection.production.username,
      connection.production.password, {
        host: connection.production.host,
        dialect: connection.production.dialect,
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: function (str) {
          //console.log(str);
        },
      },
    );
    break;
  case 'testing':
    database = new Sequelize(
      connection.testing.database,
      connection.testing.username,
      connection.testing.password, {
        host: connection.testing.host,
        dialect: connection.testing.dialect,
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: function (str) {
          //console.log(str);
        },
      },
    );
    break;
  default:
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
        host: connection.development.host,
        dialect: connection.development.dialect,
        operatorsAliases: false,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: function (str) {
          //console.log(str);
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
}

module.exports = database;
