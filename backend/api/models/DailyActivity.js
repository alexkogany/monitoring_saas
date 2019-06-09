const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_daily_activity';

const DailyActivity = sequelize.define('DailyActivity', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sDomain: {
    type: Sequelize.STRING,
  },
  sRealURL: {
    type: Sequelize.STRING,
  },
  sStartTime: {
    type: Sequelize.INTEGER,
  },
  sEndTime: {
    type: Sequelize.INTEGER,
  },
  uuid: {
    type: Sequelize.STRING,
  },
  sUserName: {
    type: Sequelize.STRING,
  },
  Hashcode: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

// eslint-disable-next-line
DailyActivity.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = DailyActivity;
