var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  multipleStatements: true
});

module.exports = dbConnection