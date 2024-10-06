const { Employee } = require('../models')
const { Op } = require('sequelize')

class Controller {
    static async getAllEmployee(req, res) {
        try {
            const { searchByName, searchByAge } = req.query
            const stats = await Employee.getEmployeeStats()
            const employee = await Employee.findAll({
                where: {
                    [Op.and]: [
                        searchByName ? { name: { [Op.iLike]: `%${searchByName}%` } } : {},
                        searchByAge ? { age: { [Op.eq]: searchByAge } } : {}
                    ]
                },
                order: [['age', 'ASC']]
            })
            console.log(stats)
            res.render('index', { employee, stats })
        } catch (error) {
            console.log(error)
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
            await Employee.update({ name, position, education, email, phone_number, profile_picture, age }, { where: { id } })
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