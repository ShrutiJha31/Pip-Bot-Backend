const express = require('express')
const router = require('express').Router()
const VerifyToken = require('../auth/VerifyToken')
const logsPage = require('./Logs')

router.get('/',logsPage.generateLog)
router.get('/getlogs',logsPage.getLogs)

module.exports = router
