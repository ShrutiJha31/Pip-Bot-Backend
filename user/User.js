'use strict';
var pool = require('../config/db_config');

var User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.plan = user.plan;
    this.isActive = user.isActive;
    this.timestamp = new Date();
};


User.create = function (newUser, result) {
    pool.query("INSERT INTO users set ?", [newUser], function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });
};

User.findById = function (id, result) {
    pool.query("Select * from users where user_id = ? ", id, function (err, res) {
        if (err) {
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

User.findByEmail = function(email,result){
    pool.query("Select * from users where email= ? ",email,function(err,res){
        if(err){
            result(err,null);
        }
        else{
            result(null,res);
        }
    });
};

User.findAll = function (result) {
    pool.query("Select user_id,email,plan,isActive,timestamp from users", function (err, res) {
        if (err) {
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

User.update = function (id, user, result) {
    pool.query("SELECT * FROM users WHERE user_id=?",[id],function(err,res){
        if(res.length!=0){
            pool.query("UPDATE users SET plan=?, isActive=? WHERE user_id = ?", [user.plan, user.isActive, id], function (err, res) {
                if (err) {
                    result(null, err);
                } else {
                    result(null, res);
                }
            });    
        }
        else{
            result(null,err);
        }
    });
};

User.delete = function (id, result) {
    pool.query("SELECT * FROM users WHERE user_id = ?",[id],function(err,res){
        if(res.length!=0){
            pool.query("DELETE FROM users WHERE user_id = ?", [id], function (err, res) {
                if (err) {
    
                    result(null, err);
                }
                else {
                    result(null, res);
                }
            });            
        }
        else{
            result(null,err);
        }
    });
};

//To be implemented later 

// User.updatePassword = function (id, user, result) {
//     pool.query("SELECT * FROM users WHERE user_id=?",[id],function(err,res){
//         if(res.length!=0){
//             pool.query("UPDATE users SET plan=?, isActive=?, timestamp=? WHERE user_id = ?", [user.email, user.password, user.plan, user.isActive, user.timestamp, id], function (err, res) {
//                 if (err) {
    
//                     result(null, err);
//                 } else {
//                     result(null, res);
//                 }
//             });    
//         }
//         else{
//             result(null,err);
//         }
//     });
// };

module.exports = User;