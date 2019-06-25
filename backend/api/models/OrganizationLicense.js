const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_google_users_license';

const OrganizationLicense = sequelize.define('OrganizationLicense', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrganizationID: {
    type: Sequelize.STRING,
  },
  selfLink: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.STRING,
  },
  productId: {
    type: Sequelize.STRING,
  },
  skuId: {
    type: Sequelize.STRING,
  },
  skuName: {
    type: Sequelize.STRING,
  },
  productName: {
    type: Sequelize.STRING,
  }
}, { tableName });

// eslint-disable-next-line
OrganizationLicense.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationLicense;
