const express = require('express')
const router = express.Router()
var VerifyToken = require('../auth/VerifyToken');
const userController =   require('./UserController');


// Retrieve all users
router.get('/',userController.findAll);
// Get youself
router.get('/me', VerifyToken ,userController.findById);
// Update yourself
router.put('/me', VerifyToken ,userController.update);
// Delete yourself
router.delete('/me', VerifyToken , userController.delete);

module.exports = router