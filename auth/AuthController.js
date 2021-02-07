var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// Secret Key
require('dotenv').config()
var User = require('../user/User');
const userController = require('../user/UserController');

router.post('/login', function (req, res) {

  //Finding if user with same email exists 
  User.findByEmail(req.body.email, function (err, user) {
    if (err) return res.status(500).send({ error: true, message: 'Error on the server' });
    if (user.length == 0) return res.status(404).send({ error: true, message: 'No user found' }); //If no
    user = user[0];

    // check if the password 
    if (req.body.password) 
    {
  
      // is valid?
      var passwordIsValid = bcrypt.compareSync(req.body.password, user['password']);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      // if user is found and password is valid
      // create a token
      var token = jwt.sign({ id: user['user_id'] }, process.env.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      // return the information including token as JSON
      res.status(200).send({ auth: true, token: token });
    }else { res.status(400).send({ error: true, message: "No password field" }); }
  
  });

});

router.post('/register', userController.create);

module.exports = router;