const express = require('express')
const router = require('express').Router()
const VerifyToken = require('../auth/VerifyToken')
const logsPage = require('./Logs')

router.get('/',VerifyToken,logsPage.generateLog)
router.get('/getlogs',VerifyToken,logsPage.getLogs)
router.delete('/deleteLogs',VerifyToken,logsPage.deleteLogs)

module.exports = router
