const {
    NewWebsites
  } = require('./addWebsitesController');
  var VerifyToken = require('../auth/VerifyToken');
  const router = require('express').Router();
  
  router.post('/', VerifyToken, NewWebsites);
 
  
  module.exports = router;