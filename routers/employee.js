const router = require('express').Router()

const Controller = require('../controllers/controller.js')

router.get('/', Controller.getAllEmployee)
router.get('/employees/add', Controller.getAddEmployee)
router.post('/employees/add', Controller.postAddEmployee)
router.get('/employees/:id', Controller.getEmployeeById) //! include form edit
router.post('/employees/:id/edit', Controller.postEditEmployee)
router.get('/employees/:id/delete', Controller.deleteEmployee)

module.exports = router