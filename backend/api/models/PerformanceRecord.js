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
    type: Sequelize.STRING(2048) ,
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
    type: Sequelize.DECIMAL(10, 2),
  },
  loadEventEnd: {
    type: Sequelize.DECIMAL(10, 2),
  },
  connectStart: {
    type: Sequelize.DECIMAL(10, 2),
  },
  connectEnd: {
    type: Sequelize.DECIMAL(10, 2),
  },
  requestStart: {
    type: Sequelize.DECIMAL(10, 2),
  },
  requestEnd: {
    type: Sequelize.DECIMAL(10, 2),
  },
  responseStart: {
    type: Sequelize.DECIMAL(10, 2),
  },
  responseEnd: {
    type: Sequelize.DECIMAL(10, 2),
  },
  domContentLoadedEventStart: {
    type: Sequelize.DECIMAL(10, 2),
  },
  domContentLoadedEventEnd: {
    type: Sequelize.DECIMAL(10, 2),
  },
  uuid: {
    type: Sequelize.STRING,
  },
  application_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  organization_id: {
    type: Sequelize.STRING,
  },
}, { tableName });

// eslint-disable-next-line
PerformanceRecord.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

 

  return values;
};

module.exports = PerformanceRecord;
