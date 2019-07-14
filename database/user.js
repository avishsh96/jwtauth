const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const user = mongoose.Schema({
username:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:false
},
password:{
    type:String,
    required:true,
    trim:true
},
firstname:{
    type:String,
    required:true,
    trim:true
},
lastname:{
    type:String,
    required:true,
    trim:true
},
phoneNumber:{
    type:Number,
    trim:false
},
dob:{
    type:Number,
    trim:true,
    default:Date.now
}

});

user.pre('save',function(next){
    this.password = bcrypt.hashSync(this.password,saltRounds);
    next();
    });
    
    
module.exports = mongoose.model('user',user);