const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

const config = {
  migrate: false,
  tokenRoutes,
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '2017',
};

module.exports = config;
