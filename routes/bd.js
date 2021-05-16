var mysql = require('mysql');
  var connect = mysql.createConnection( {
    host:'localhost',
    user:'root',
    password:'123456',
    database:'项目',
    port:'3306'
});
connection.connect();

let delSql = 'DELECT FROM student where sid=?'


connection.query(delSql,function(err,result){
    if(err){
        console.log(err.message)
        return
    }
    console.log(result)
})
connect.end();

