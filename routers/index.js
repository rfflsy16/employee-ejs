const router = require('express').Router()
const employee = require('./employee.js')

router.use('/', employee)

module.exports = router