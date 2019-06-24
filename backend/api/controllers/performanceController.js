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
    



          let perf_record = {};
          
          perf_record.UserName = req.body.sUserName;
          perf_record.cUserName= req.body.cUserName;
          perf_record.cUserEmail= req.body.cUserEmail;
          perf_record.userIP= req.body.userIP;
          perf_record.userExternalIP= req.body.userExternalIP;
          perf_record.URL= req.body.URL;
          perf_record.Domain= req.body.Domain;
          perf_record.Hashcode= req.body.Hashcode;
          perf_record.PageLoadTime= req.body.PageLoadTime;
          perf_record.loadEventStart= req.body.loadEventStart;
          perf_record.loadEventEnd= req.body.loadEventEnd;
          perf_record.connectStart= req.body.connectStart;
          perf_record.connectEnd= req.body.connectEnd;
          perf_record.requestStart= req.body.requestStart;
          perf_record.requestEnd= req.body.requestEnd;
          perf_record.responseStart= req.body.responseStart;
          perf_record.responseEnd= req.body.responseEnd;
          perf_record.domContentLoadedEventStart= req.body.domContentLoadedEventStart;
          perf_record.domContentLoadedEventEnd= req.body.domContentLoadedEventEnd;
          perf_record.uuid= req.body.uuid;
          perf_record.application_id= req.body.application_id;
          perf_record.organization_id= req.body.OrganizationID;

          PerformanceRecord.create(perf_record);
    
    
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
