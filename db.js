const mysql = require('mysql');

function createConnection() {
  return mysql.createConnection({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: 'unpocoloco',
    database: 'database_lab',
  });
}

function query(sql, params, callback) {
  const connection = createConnection();

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the MySQL database:', err);
      callback(err, null);
    } else {
      connection.query(sql, params, (error, results) => {
        connection.end(); // Close the connection after query execution
        callback(error, results);
      });
    }
  });
}

module.exports = {
  query,
};