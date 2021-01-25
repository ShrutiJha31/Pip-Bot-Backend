const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var pool=require('./config/db_config')

app.listen(PORT,()=>{
    console.log(`Server is listing at ${PORT}`)
})


