const express = require('express')
const dbConn = require('../config/db_config')
const util = require('util');
const exec = util.promisify(require('child_process').exec);


exports.generateLog =  (req,res) =>{

  var website = []
  let sql = 'SELECT * FROM websites ORDER BY website_id DESC LIMIT 1'
    dbConn.query(sql,(err,result)=>{
     if(err)
     console.log(err)
     website.push(result[0])
    //  console.log(website)
    var command = `curl -sL -Is -A "Googlebot/2.1 (+http://www.google.com/bot.html)" -w ";%{http_code};%{time_total}" "${website[0].link}" `

    child = exec(command, function(error, stdout, stderr){
     
       if(stderr){
        console.log(`stderr:${stderr}`)
       } 
       else{
        const response = stdout.split(";")
        const reverse = response.reverse()
        let sql1 = 'INSERT INTO logs (website_id,status,response_time) VALUES (?,?,?)'
          dbConn.query(sql1,[website[0].website_id,reverse[1],reverse[0]],(err,result)=>{
             if(err)
             console.log(err)
             else{
                res.json({
                    code: reverse[1],
                    time : reverse[0]
                })
             }
          })
       
    } 
    if(error!== null){
        console.log(`error:${error}`)
        return
    }
 })
 })
}





