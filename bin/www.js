#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app')
var debug = require('debug')('ChamaBombeiro:server')
var sequelize = require('../database/database_connection')

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'

app.set('env', 'development')
app.set('port', server_port)

sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), server_ip_address, function () {
    console.log('Express server ' + server.address().address + ' listening on port ' + server.address().port)
    debug('Express server listening on port ' + server.address().port)
  })
})
