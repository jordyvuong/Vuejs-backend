const { Sequelize } = require('sequelize')

const sequelizeClient = new Sequelize(
    'homemade', //base de donnée
    'homemade', // username
    'postgres', // password
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)

module.exports = sequelizeClient