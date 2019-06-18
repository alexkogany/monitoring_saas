const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_admin_user';

const OrganizationAdminUser = sequelize.define('OrganizationAdminUser', {
  admin_user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  lastlogin: {
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
OrganizationAdminUser.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationAdminUser;
