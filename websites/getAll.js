
const express=require("express");
const router=express.Router();
const dbConn = require('../config/db_config')
const VerifyToken = require('../auth/VerifyToken')

router.get('/',VerifyToken,(req,res)=>{
   
      dbConn.query('SELECT * FROM websites WHERE user_id = ?',[req.userId],(err,result)=>{
        if(err)
        console.log(err)
        else{
          res.status(200).send(result)
        }
    })
  

})

module.exports = router