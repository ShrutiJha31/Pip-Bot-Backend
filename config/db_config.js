// require("dotenv/config");
require('dotenv').config()
const util = require("util");
const mysql = require("mysql");
const fs=require('fs');
const path=require('path');

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
   multipleStatements: true

});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database");
    const sql = fs.readFileSync(path.join(__dirname, './../db.sql')).toString();
    connection.query(sql, function(err, result){
      
      if(err){
          console.log('error: ', err);
          
      }
      
  });
  }
  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);
module.exports = pool;