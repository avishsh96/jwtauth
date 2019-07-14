const express = require('express');
const router = express.Router();
const user = require('../controller/user');



router.get("/register/new",function(req,res){
res.render("register");
})
router.post('/register',user.create);
router.get("/authenticate/new",function(req,res){
res.render("authenticate");
})
router.post('/authenticate',user.authenticate);

module.exports = router;

