var Sequelize = require('sequelize')
//
// var sequelize = new Sequelize('jacksonlima', 'jacksonlima', 'DeTo0709', {
//  host: 'localhost',
//  dialect: 'postgres',
//
//  pool: {
//    max: 5,
//    min: 0,
//    idle: 10000
//  },
// })

// Or you can simply use a connection uri
var sequelize = new Sequelize('postgres://jacksonlima:DeTo0709@localhost:5432/test_node')

module.exports = sequelize
