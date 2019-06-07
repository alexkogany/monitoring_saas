/* eslint-disable no-console */
const DailyActivityRecord = require('../models/DailyActivity');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const log = require('../log/loggly');
const sequelize = require('../../config/database');


const dailyActivityRecordController = () => {
  
  

  const addDailyActivityRecord = async (req, res) => {
    try {
      log.send2server(req.body);
      // const { sUserName, cUserName } = req.body;

      // console.log(sUserName);
      // console.log(cUserName);

      DailyActivityRecord.create(req.body);


      return res.status(200).json({});
    } catch (err) {
      console.log(err);
      // log.send2server(`{"error":"${err.message}"}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const getDailyActivityRecords = async (req, res) => {
    try {
      const userrecords = await UserRecord.findOne({});

      return res.status(200).json({ userrecords });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getDailyActivityRecordsByField = async (req, res) => {
    try {

      const { fieldname, value } = req.body;
      // const userrecords = sequelize.query("SELECT * FROM users", { type: sequelize.QueryTypes.SELECT})
      sequelize.query(`SELECT * FROM userrecords where "${fieldname}"='${value}'`, { type: sequelize.QueryTypes.SELECT })
        .then((userrecords) => 
         res.status(200).json({ userrecords })// We don't need spread here, since only the results will be returned for select queries
      )
        .catch((error) => {
          console.error(`onRejected function called: ${  error.message}`);
          return res.status(500).json({});
        });

      // await UserRecord.findAll(
      //  {where: [fieldname, value]}
      // );


    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    addDailyActivityRecord,
    getDailyActivityRecords,
    getDailyActivityRecordsByField,
    
  };
};

module.exports = dailyActivityRecordController;
