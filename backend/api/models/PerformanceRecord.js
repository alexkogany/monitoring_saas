const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_performance_records';

const PerformanceRecord = sequelize.define('PerformanceRecord', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sUserName: {
    type: Sequelize.STRING,
  },
  cUserName: {
    type: Sequelize.STRING,
  },
  cUserEmail: {
    type: Sequelize.STRING,
  },
  userIP: {
    type: Sequelize.STRING,
  },
  userExternalIP: {
    type: Sequelize.STRING,
  },
  URL: {
    type: Sequelize.STRING(1024) ,
  },
  Domain: {
    type: Sequelize.STRING,
  },
  Hashcode: {
    type: Sequelize.INTEGER,
  },
  PageLoadTime: {
    type: Sequelize.STRING,
  },
  loadEventStart: {
    type: Sequelize.STRING,
  },
  loadEventEnd: {
    type: Sequelize.STRING,
  },
  connectStart: {
    type: Sequelize.STRING,
  },
  connectEnd: {
    type: Sequelize.STRING,
  },
  requestStart: {
    type: Sequelize.STRING,
  },
  requestEnd: {
    type: Sequelize.STRING,
  },
  responseStart: {
    type: Sequelize.STRING,
  },
  responseEnd: {
    type: Sequelize.STRING,
  },
  domContentLoadedEventStart: {
    type: Sequelize.STRING,
  },
  domContentLoadedEventEnd: {
    type: Sequelize.STRING,
  },
  uuid: {
    type: Sequelize.STRING,
  },
  application_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  OrganizationID: {
    type: Sequelize.STRING,
  },
}, { tableName });

// eslint-disable-next-line
PerformanceRecord.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

 

  return values;
};

module.exports = PerformanceRecord;
