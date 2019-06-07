const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'tbl_daily_activity';

const DailyActivity = sequelize.define('DailyActivity', {
  record_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sURL: {
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
  chromeID: {
    type: Sequelize.STRING,
  },
}, { tableName });

// eslint-disable-next-line
DailyActivity.prototype.toJSON = function () {
  const values = Object.assign({}, this.get()); 
  return values;
};

module.exports = DailyActivity;
