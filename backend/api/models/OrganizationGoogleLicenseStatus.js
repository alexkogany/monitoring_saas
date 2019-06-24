const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_organization_google_license_status';

const OrganizationGoogleLicenseStatus = sequelize.define('organization_google_license_status', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  OrganizationID: {
    type: Sequelize.STRING,
  },
  application_id: {
    type: Sequelize.INTEGER,
  },
  main_application_id: {
    type: Sequelize.INTEGER,
  },
  gsuite_basic_total_licenses: {
    type: Sequelize.INTEGER,
  },
  gsuite_basic_used_licenses: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

// eslint-disable-next-line
OrganizationGoogleLicenseStatus.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = OrganizationGoogleLicenseStatus;
