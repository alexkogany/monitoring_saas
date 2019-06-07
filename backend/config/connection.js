const development = {
  database: 'postgres',
  username: 'postgres',
  password: 'q86t301',
  host: '193.42.110.222',
  dialect: 'postgres',
};

const testing = {
  database: 'postgres',
  username: 'postgres',
  password: 'q86t301',
  host: '193.42.110.222',
  dialect: 'postgres',

};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};

module.exports = {
  development,
  testing,
  production,
};
