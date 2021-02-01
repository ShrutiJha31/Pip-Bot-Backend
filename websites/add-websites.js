const express=require("express");
const Router=express.Router();
var pool=require('./../config/db_config')
var VerifyToken = require('../auth/VerifyToken');


Router.post('/',VerifyToken, function (req, res) {

        pool.getConnection((err, connection) => {
                if(err) throw err
                
                
                if (req.body.user_id!=req.userId) return res.status(401).send({error:true, message:'Authentication Error'});
                connection.query('INSERT INTO websites SET ?',[req.body ], (err, rows) => {
                connection.release() 
                if (!err) {
                    res.send(rows)
                    console.log(rows)
                    console.log("Inserted Successfully!")                             
                } else {
                    console.log(err)
                }
                
            
        
                })
            })
}); 


module.exports = Router;
