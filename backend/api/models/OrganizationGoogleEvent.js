const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_google_events';

const OrganizationGoogleEvent = sequelize.define('OrganizationGoogleEvent', {
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
OrganizationGoogleEvent.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationGoogleEvent;
