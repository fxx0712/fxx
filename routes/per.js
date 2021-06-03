
let express =require('express');
let router = express.Router();
var mysql = require('mysql');

/* GET home page. */

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',    
  port: '3306',    
  database : '项目'
});
connection.connect();


module.exports = router;
