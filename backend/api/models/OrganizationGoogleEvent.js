const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_google_events';

const OrganizationGoogleEvent = sequelize.define('OrganizationGoogleEvent', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  kind: {
    type: Sequelize.STRING,
  },
  eventTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  eventuniqueQualifier: {
    type: Sequelize.STRING
  },
  eventApplicationName: {
    type: Sequelize.STRING,
  },
  eventCustomerID: {
    type: Sequelize.STRING,
  },
  eventActorEmail: {
    type: Sequelize.STRING
  },
  eventActorProfileID: {
    type: Sequelize.STRING
  },
  eventIPAddress: {
    type: Sequelize.STRING
  },
  eventType: {
    type: Sequelize.STRING
  },
  eventName: {
    type: Sequelize.STRING
  },
  createDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, { tableName });

// eslint-disable-next-line
OrganizationGoogleEvent.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationGoogleEvent;
