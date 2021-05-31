let express =require('express');
let router = express.Router();
let User = require('./bean/user')
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

router.get('/',(req,res) =>{
    res.render('register');
});



router.get('/login',(req,res) =>{
  res.render('login');
});


router.get('/2',function(req,res){
    res.render('2')
});

router.get('/index',(req,res)=>{
    res.render('index')

});

router.get('/per',(req,res)=>{
    connection.query("SELECT * FROM login",(err,result) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }
        console.log(result)
        res.render("per",{
            users:result
    })
})
});





router.post('/register',(req,res) =>{
    let body = req.body
    let user = new User(body.name,body.password);
    console.log(user);
    req.session.user =user;
     connection.query('insert into login values(null,?,?,?,?,?,?)',[body.name,body.password,body.phone,body.email,body.sex,body.like],(err,_result)=>{ 
        if (err) {
            console.log(err)
            return res.status(500)
        }
        res.redirect("/per")
     });

   // connection.query('select * from login',(err,_result)=>{
    //    if(err) throw err
     //   console.log(_result)
   // }
   // );

});




router.post('/login',(req,res)=>{
    let body = req.body
    // let password = req.body.password;
    // if(req.session.user != undefined && name == req.session.user.name && password==req.session.user.password )
    // {
    //     res.send("成功");
    // }
    // else{
    //     res.send("失败");
    // }
    connection.query('SELECT name,password FROM login',(err,result)=>{
        let ok = false
        for(i of result){
            if(i.name === body.name && i.password === body.password){
                ok = true
                res.render('index')
               // break
            }else(
                ok = false
            )
        }
        if(ok){
            res.render('index')
        }else{
            res.send('登陆失败')
        }
    })
    
});




module.exports = router;
