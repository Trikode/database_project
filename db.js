const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port:"3307",
  user: 'root',
  password: 'unpocoloco',
  database: 'database_lab',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

module.exports = connection;
