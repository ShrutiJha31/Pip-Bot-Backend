const express=require("express");
const Router=express.Router();
var pool=require('./../config/db_config')
var VerifyToken = require('../auth/VerifyToken');


Router.delete('/:website_id', VerifyToken, function (req, res) {

    pool.getConnection((err, connection) => {
            if(err) throw err
            
            
            console.log(req.body);

            connection.query('DELETE FROM websites  where website_id=?; DELETE FROM logs  where website_id=?', [req.params.website_id,req.params.website_id], (err, rows) => {
            connection.release() 
            if (!err) {
                res.send("Deleted Successfully!")
            } else {
                console.log(err)
            }
            
            console.log(rows)
    
            })
            
        })
}); 

module.exports = Router;