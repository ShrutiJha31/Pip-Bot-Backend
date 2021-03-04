const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
global.__currentuser   = 0; 
var pool=require('./config/db_config')
const cors = require('cors')
app.use(cors())
// // root route
app.get('/', (req, res) => {
    res.send("Success");
});


const WebsiteAdding = require("./websites/addWebsitesControlller");
const WebsiteRemoving = require("./websites/removeWebsites");
const GetAllWebsites = require('./websites/getAll')
app.use("/addWebsites", WebsiteAdding);
app.use("/removeWebsites", WebsiteRemoving);
app.use("/getAllWebsites", GetAllWebsites)

const userRoutes = require('./user/UserRoute');
const AuthRoutes = require('./auth/AuthController');
// using as middleware
app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/user', userRoutes)

//logs
const LogsRoute = require('./logs/LogsRouter')
app.use('/logs',LogsRoute)

app.listen(PORT,()=>{
    console.log(`Server is listing at ${PORT}`)
})


