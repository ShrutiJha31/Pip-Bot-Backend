const { Router } = require('express')
const express=require("express");
const router=express.Router();
const dbConn = require('../config/db_config')

router.get('/',(req,res)=>{
    dbConn.query('SELECT * FROM websites',(err,result)=>{
        if(err)
        console.log(err)
        else{
          res.status(200).send(result)
        }
    })
})

module.exports = router