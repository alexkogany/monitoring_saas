/* eslint-disable no-console */
const PerformanceRecord = require('../models/PerformanceRecord');
const log = require('../log/loggly');
const sequelize = require('../../config/database');
var cache = require('global-cache');

const performanceController = () => {
    const addperformanceRecord = async (req, res) => {
        try {
          log.send2server(req.body);
          var request = req.body;
          var application = cache.get(req.body.Domain);
         
    
        
          if(application!==undefined)
            request.application_id = application;    
    
          PerformanceRecord.create(req.body);
    
    
          return res.status(200).json({status : "Ok"});
        } catch (err) {
          console.log(err);
          // log.send2server(`{"error":"${err.message}"}`);
          return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const getperformanceRecords = async (req, res) => {
        try {
          const userrecords = await UserRecord.findOne({});
    
          return res.status(200).json({ userrecords });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    const getperformanceRecordsByField = async (req, res) => {
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
        addperformanceRecord,
        getperformanceRecords,
        getperformanceRecordsByField,
      };
  };

  

module.exports = performanceController;
