const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization';

const OrganizationToken = sequelize.define('Organization', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrganizationID: {
    type: Sequelize.STRING,
  },
  OrganizationName: {
    type: Sequelize.STRING,
  },
  OrganizationEmail: {
    type: Sequelize.STRING,
  },
  Enable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  CreateDate: {
    type: Sequelize.BOOLEAN,
    defaultValue: Sequelize.NOW
  },
}, { tableName });

// eslint-disable-next-line
Organization.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = Organization;
