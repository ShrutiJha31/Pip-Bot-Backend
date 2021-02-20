const express=require("express");
const Router=express.Router();
// var pool=require('./../config/db_config')
var VerifyToken = require('../auth/VerifyToken');
var dbConn = require('../config/db_config');

Router.post('/',VerifyToken,function (req, res) {
                const body = req.body
                const userid = req.userId
                dbConn.query("INSERT INTO websites (website_name,tags,link,intervals,user_id) VALUES (?,?,?,?,?) ",
                [body.website_name, body.tags, body.link, body.interval, userid],
               (err, rows) => {
               
                if (!err) {
                    res.send(rows)
                    console.log(rows)
                    console.log("Inserted Successfully!")                             
                } else {
                    console.log(err)
                }})
}); 


module.exports = Router;
