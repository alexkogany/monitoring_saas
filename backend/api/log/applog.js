
var appRoot = require('app-root-path');
var winston = require('winston');
var winstonConf = require('winston-config');
// var options = {
//     file: {
//       level: 'info',
//       filename: `${appRoot}/logs/app.log`,
//       handleExceptions: true,
//       json: true,
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//       colorize: false,
//     },
//     console: {
//       level: 'debug',
//       handleExceptions: true,
//       json: false,
//       colorize: true,
//     },
//   };

//   var logger = new winston.Logger({
//     transports: [
//       new winston.transports.File(options.file),
//       new winston.transports.Console(options.console)
//     ],
//     exitOnError: false, // do not exit on handled exceptions
//   });

function winston_logger(callback) {
    //console.log("test");
    winstonConf.fromFile(__dirname + '/winston-config.json',(error, winston) => {
        //console.log(winston);       
        //console.log(error);
        callback(winston);
    });
    
}

winston_logger.prototype.appLogger = function appLogger() {
    return winston.loggers.get('application');            
};

  
    // const appLogger = () => { 
    //     var appLogger = winston.loggers.get('application');    
    //     return {
    //         appLogger,        
    //     };
    // };

    // const httpLogger = () => { 
    //     var httpLogger = winston.loggers.get('http');    
    //     return {
    //         httpLogger,        
    //     };
    // };





module.exports = {
    winston : winston_logger
}