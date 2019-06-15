var schedule = require('node-schedule');
var job1 = require('./jobs/jobRenewToken');
var job2 = require('./jobs/jobGetOrgUsers');

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

}


module.exports = {
    runAllJobs:runAllJobs
}