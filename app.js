const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/niflr',{useNewUrlParser:true});
mongoose.set('useNewUrlParser', true);

const port = 3000;

app.set("view engine","ejs");
app.set('secretKey','niflrassignement');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/',user);

app.listen(port,function(){
    console.log('Server listening on',port);
});

// function validateUser(req, res, next) {
//     jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
//         if (err) {
//             res.json({status: "error", message: err.message, data: null});
//         } else {
//             // add user id to request
//             req.body.userId = decoded.id;
//             next();
//         }
//     });
// }
