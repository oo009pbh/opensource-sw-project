const mysql = require('mysql2');

const conn = mysql.createPool({
  host: 'localhost',
  user: 'crawl_usr',
  password: '1234',
  database: 'crawl_data',
  charset: 'utf8',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = conn;