'use strict';
const {
  Model,
  fn,
  col
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {

    static associate(models) {
      // define association here
    }

    static async getEmployeeStats() {
      try {
        const result = await Employee.findAll({
          attributes: [
            [fn('COUNT', col('id')), 'total_employees'],
            [fn('MAX', col('age')), 'oldest_employee'],
            [fn('MIN', col('age')), 'youngest_employee']
          ]
        })

        return result[0].dataValues
      } catch (error) {
        throw error
      }
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    education: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};