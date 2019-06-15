const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_users';

const OrganizationUser = sequelize.define('OrganizationUser', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleID: {
    type: Sequelize.STRING,
  },
  googleetag: {
    type: Sequelize.STRING,
  },
  OrganizationID: {
    type: Sequelize.STRING,
  },
  UserEmail: {
    type: Sequelize.STRING,
  },
  Name: {
    type: Sequelize.STRING,
  },
  FamilyName: {
    type: Sequelize.STRING,
  },
  FullName: {
    type: Sequelize.STRING,
  },
  IsAdmin: {
    type: Sequelize.BOOLEAN,
  },
  LastGoogleLoginTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  CreationGoogleLoginTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  GoogleSuspended: {
    type: Sequelize.BOOLEAN,
  },
  GoogleGender: {
    type: Sequelize.STRING,
  },
  GoogleCustomerID: {
    type: Sequelize.STRING,
  },
  ipWhitelisted: {
    type: Sequelize.BOOLEAN,
  },
  Enable: {
    type: Sequelize.BOOLEAN
  },
  CreateDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
}, { tableName });

// eslint-disable-next-line
OrganizationUser.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationUser;
