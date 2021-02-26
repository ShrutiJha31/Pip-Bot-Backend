const express = require('express')
const dbConn = require('../config/db_config')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


exports.generateLog =  (req,res) =>{
  let id = req.userId
  var website = []
  let sql = 'SELECT * FROM websites WHERE user_id = ? ORDER BY website_id DESC LIMIT 1'
    dbConn.query(sql,[id],(err,result)=>{
     if(err)
     console.log(err)
     if(result.length == 0){
        res.status(404).send({
           message:"No website Added"
        })
     }
     else{
     website.push(result[0])
     //  console.log(website[0].link)
     var command = `curl -sL -Is -A "Googlebot/2.1 (+http://www.google.com/bot.html)" -w ";%{http_code};%{time_total}" "${website[0].link}" `
 
     child = exec(command, function(error, stdout, stderr){
      
        if(stderr){
         console.log(`stderr:${stderr}`)
        } 
        else{
         const response = stdout.split(";")
         const reverse = response.reverse()
         let sql1 = 'INSERT INTO logs (user_id,website_id,status,response_time) VALUES (?,?,?,?)'
           dbConn.query(sql1,[id,website[0].website_id,reverse[1],reverse[0]],(err,result)=>{
              if(err)
              console.log(err)
              else{
                 res.json({
                     link : website[0].link,
                     code: reverse[1],
                     time : reverse[0],
                     interval : website[0].intervals
                 })
              }
           })
          
     } 
     if(error!== null){
         console.log(`error:${error}`)
         return
     }
     })
   }
 })
}

exports.getLogs = (req,res)=>{
   dbConn.query('SELECT * FROM logs WHERE user_id = ?',[req.userId],(err,result)=>{
      if(err)
      console.log(err)
      else{
         res.status(200).send(result)
      }
   })
}

exports.deleteLogs = (req,res) =>{
   id = req.userId
   dbConn.query('SELECT * FROM logs WHERE user_id = ?',[id],(err,result)=>{
      if(err)
      console.log(err)
      else{
         if(result.length != 0 )
         {
            dbConn.query('DELETE FROM logs WHERE user_id = ? ',[id],(err,result)=>{
               if(err)
               console.log(err)
               else{
                  res.status(200).send({
                     message:"logs deleted"
                  })
               }
            })
         }
         else{
            res.status(400).send({
               message:"no logs detected"
            })
         }
      }
   })
}




