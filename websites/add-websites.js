const express=require("express");
const Router=express.Router();
var pool=require('./../config/db_config')
var VerifyToken = require('../auth/VerifyToken');


Router.post('/',VerifyToken, function (req, res) {

        pool.getConnection((err, connection) => {
                if(err) throw err
                connection.query('INSERT INTO websites SET ?',req.body, (err, rows) => {
                connection.release() 
                if (!err) {
                    res.send(rows)
                    console.log("Inserted Successfully!");                            
                } else {
                    console.log(err);
                }

                console.log(rows);
        
                })
            })
}); 


module.exports = Router;
