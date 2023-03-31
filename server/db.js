const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: 'Mdomdo1$',
  host: 'localhost',
  port: 5432,
  database: 'HotelDB'
});

module.exports = pool