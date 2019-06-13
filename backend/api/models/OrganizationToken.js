const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_token';

const OrganizationToken = sequelize.define('OrganizationToken', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrganizationToken: {
    type: Sequelize.STRING,
  },
  OrganizationRefreshToken: {
    type: Sequelize.STRING,
  },
  OrganizationID: {
    type: Sequelize.STRING,
  },
  Scope: {
    type: Sequelize.STRING(1000),
  },
  ReceivedTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  Expired: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

// eslint-disable-next-line
OrganizationToken.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationToken;
