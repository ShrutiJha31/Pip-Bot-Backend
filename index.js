const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
global.__currentuser   = 0; 
var pool=require('./config/db_config')

// // root route
app.get('/', (req, res) => {
    res.send("Success");
});



  
const userRoutes = require('./user/UserRoute');
const AuthRoutes = require('./auth/AuthController');
const WebsiteAdding = require("./websites/add-websites");
const WebsiteRemoving = require("./websites/remove-websites");
// using as middleware
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/user', userRoutes)
app.use("/add-websites", WebsiteAdding);
app.use("/remove-websites", WebsiteRemoving);

app.listen(PORT,()=>{
    console.log(`Server is listing at ${PORT}`)
})


