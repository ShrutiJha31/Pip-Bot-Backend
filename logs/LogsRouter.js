const express = require('express')
const Router = require('express').Router()
const VerifyToken = require('../auth/VerifyToken')
const logsPage = require('./Logs')

Router.get('/',logsPage.generateLog)

module.exports = Router
