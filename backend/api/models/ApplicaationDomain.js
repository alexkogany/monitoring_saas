const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_application_domain';

const ApplicationDomain = sequelize.define('ApplicationDomain', {
    ApplicationId: {
    type: Sequelize.INTEGER,
  },
  domain_url: {
    type: Sequelize.STRING,
  },
  
  create_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  enable: {
    type: Sequelize.BOOLEAN,
  },
}, { tableName });

// eslint-disable-next-line
ApplicationDomain.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = ApplicationDomain;
