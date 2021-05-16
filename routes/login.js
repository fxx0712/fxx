let express =require('express');
let router = express.Router();

router.get('/',(req,res) =>{
    res.render('login');
});
router.post('/login',(req,res)=>{
    let name =req.body.name;
    let password = req.body.password;
    if(req.session.user != undefined && name == req.session.user.name && password==req.session.user.password)
    {
        res.send("成功");
    }
    else{
        res.send("失败");
    }
});

module.exports = router;