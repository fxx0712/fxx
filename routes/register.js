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
router.get('/3',(req,res)=>{
    res.render('per')

})

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
//查询
router.post("/search",(req,res) => {
    var name =  req.body.name;
    connection.query("SELECT * FROM login WHERE name = ? ",[name],(err,result) => {
        if (err) {
            console.log(err)
            return res.status(500)
        }
        res.render("per",{
            users:result
        })
    })
})




//注册
router.post('/register',(req,res) =>{
    let body = req.body
    console.log(req.body)
    let user = new User(body.name,body.password);
    
    req.session.user =body;
     connection.query('insert into login values(null,?,?,?,?,?,?)',[body.name,body.password,body.telephone,body.email,body.sex,body.love],(err,_result)=>{ 
        if (err) {
            console.log(err)
            return res.status(500)
        }
        res.redirect("/login")
     });

});

//新增
router.post('/add',(req,res) =>{
    let body = req.body
    console.log(req.body)
    let user = new User(body.name,body.password);
    
    req.session.user =body;
     connection.query('insert into login values(null,?,?,?,?,?,?)',[body.name,body.password,body.telephone,body.email,body.sex,body.love],(err,_result)=>{ 
        if (err) {
            console.log(err)
            return res.status(500)
        }
        res.redirect("/per")
     });

});




//登录
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
                break
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

//删除
  router.get('/a',(req,res)=>{
        let delSql = "delete from login where id =?"
        
        let data =[parseInt(req.query.id) ]
      connection.query(delSql,data,function (err, result) {
              if(err){
                console.log(err.message)
                return
              }       
              res.redirect('/per')
      })
})
//修改    
router.get("/edit",(req,res) => {
    let id = req.query.editId;
    let findById = "SELECT * FROM login where id = ?";
    connection.query(findById,[id],(err,result) => {
        if(err){
           console.log(err.message)
           return
        }
        res.render('3',{
            id:result[0].id,
            name:result[0].name,
            password: result[0].password,
            sex: result[0].sex,
            email: result[0].email,
            telephone: result[0].telephone,
            love: result[0].love
        })
    })
})

router.post("/edit",(req,res) => {
    var editQuery = "UPDATE login SET name = ? , password = ? ,telephone = ?,email = ?,sex = ?,love = ? WHERE id = ?";
    var mod = [req.body.name,req.body.password,req.body.telephone,req.body.email,req.body.sex,req.body.love,req.body.id]
    connection.query(editQuery,mod,(err,result) => {
        if(err){
            console.log(err)
            return
         }
        res.redirect('/per')
    })
})

module.exports = router;
