const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'userrecords';

const UserRecord = sequelize.define('UserRecord', {
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
    type: Sequelize.STRING,
  },
  IdleTime: {
    type: Sequelize.INTEGER,
  },
  PageLoadTime: {
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
}, { tableName });

// eslint-disable-next-line
UserRecord.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = UserRecord;
