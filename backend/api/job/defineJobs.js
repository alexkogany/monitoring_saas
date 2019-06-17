var schedule = require('node-schedule');
var job1 = require('./jobs/jobRenewToken');
var job2 = require('./jobs/jobGetOrgUsers');
var job2 = require('./jobs/jobGetOrgUsers');
var job3 = require('./jobs/jobUserGoogleAppEvents');
var job4 = require('./jobs/jobGetLicense');

//const importModules = require('import-modules');

const runAllJobs = () => {
    var j = schedule.scheduleJob('*/1 * * * *', function(){
        //console.log('Today is recognized by Rebecca Black!');
        job1.runjob();
      });

    var k = schedule.scheduleJob('*/10 * * * *', function(){
        //console.log('Today is recognized by Rebecca Black!');
        job2.runjob();
      });  

    var p = schedule.scheduleJob('*/10 * * * *', function(){
        //console.log('Today is recognized by Rebecca Black!');
        var j = new job3();
        j.runjob();
      });  

    var k = schedule.scheduleJob('*/10 * * * *', function(){
        //console.log('Today is recognized by Rebecca Black!');
        var j = new job4();
        j.runjob();
      });        

}


module.exports = {
    runAllJobs:runAllJobs
}