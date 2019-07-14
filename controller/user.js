const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER = require('../database/user');
const mongoose = require('mongoose');

module.exports = {
    create: function (req, res, next) {
        USER.create({
            //_id: new mongoose.Types.ObjectId(),
            username:req.body.username,
            email:req.body.email,
            password: req.body.password,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phoneNo: req.body.phoneNo,
            dob:req.body.dob

        }, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: 'success', message: "user added successfully", data: result});
        });
    },
    authenticate: function (req, res) {
        const {email, password} = req.body;
        if (!email || !password) return res.status(401).json({status: "error", message: "Invalid email/password!!!"});
        USER.findOne({email}, function (err, userInfo) {
            if (err) {
                return res.status(400).json({status: "error", message: "Bad request"});
            } else {
                if (bcrypt.compareSync(password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '2h'});
                    const {name, email, gender, contact, role, _id} = userInfo;
                    res.send({
                        status: "success",
                        message: "Login Successfully...",
                        data: {user: {name, email, gender, contact, role, id: _id}, token: token}
                    });
                } else {
                    res.status(404).json({status: "error", message: "Invalid email/password!!!", data: null});
                }
            }
        });
    }

};
