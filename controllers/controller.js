const { where } = require('sequelize')
const { Employee, sequelize } = require('../models')

class Controller {
    static async getAllEmployee(req, res) {
        try {
            const employee = await Employee.findAll({

            })
            // console.log(employee)
            res.render('index', { employee })
        } catch (error) {
            res.send(error)
        }
    }

    static async getAddEmployee(req, res) {
        try {
            res.render('addEmployee')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postAddEmployee(req, res) {
        try {
            const { name, position, education, email, phone_number, profile_picture, age } = req.body
            // console.log(name, position, education, email, phone_number, profile_picture, age)
            await Employee.create({name, position, education, email, phone_number, profile_picture, age})
            res.redirect('/')
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async getEmployeeById(req, res) {
        try {
            const { id } = req.params
            const employee = await Employee.findByPk(id)
            res.render('editEmployee', {employee} )
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditEmployee(req, res) {
        try {
            const { id } = req.params
            const { name, position, education, email, phone_number, profile_picture, age } = req.body
            await Employee.update({name, position, education, email, phone_number, profile_picture, age}, { where: { id } })
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteEmployee(req, res) {
        try {
            const { id } = req.params
            await Employee.destroy({where: { id }})
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller