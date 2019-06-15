/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
var request_logger_morgan = require('morgan');
var fs = require('fs')
var rfs = require('rotating-file-stream')
var path = require('path')
var jobsD = require('./job/defineJobs')



/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');
var logger = require("./log/applog")

jobsD.runAllJobs();

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const mappedTokenRoutes = mapRoutes(config.tokenRoutes, 'api/controllers/');

const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
//logger.info('LOGMESSAGE');
var localloger;
var my_obj_instance = new logger.winston((variable1)=>{
    //console.log(variable1);
    //localloger = variable1;
   global.logger = variable1;

   variable1.loggers.get('application').info('LOGMESSAGE');
   variable1.loggers.get('http').info('HTTPMESSAGE');
   
});
//var test = my_obj_instance.appLogger;

//.info('LOGMESSAGE');


var logDirectory = path.join(__dirname, 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})


app.use([cors(),request_logger_morgan('combined',{ stream:accessLogStream})]);

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// secure your private routes with jwt authentication middleware
app.all('/private/*', (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use('/public', mappedOpenRoutes);
app.use('/private', mappedAuthRoutes);
app.use('/auth', mappedTokenRoutes);
app.use('/site', express.static('site'));

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    // eslint-disable-next-line no-console
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  
  return DB;
});
