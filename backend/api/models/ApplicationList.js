const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_application_list';

const Application = sequelize.define('Application', {
  application_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  application_name: {
    type: Sequelize.STRING,
  },
  
  /*create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },*/
  enable: {
    type: Sequelize.BOOLEAN,
  },
}, { tableName });

// eslint-disable-next-line
Application.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = Application;
