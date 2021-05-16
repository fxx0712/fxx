let express =require('express');
let router = express.Router();
let User = require('./bean/user')

router.get('/',(req,res) =>{
    res.render('register');
});

router.post('/register',(req,res) =>{
    let user = new User(req.body.name,req.body.password);
    console.log(user);

    req.session.user =user;
    res.render('login')

});

router.get('/login',(req,res) =>{
    res.render('login');
})

router.post('/login',(req,res)=>{
    let name =req.body.name;
    let password = req.body.password;
    if(req.session.user != undefined && name == req.session.user.name && password==req.session.user.password )
    {
        res.send("成功");
    }
    else{
        res.send("失败");
    }
});


module.exports = router;
