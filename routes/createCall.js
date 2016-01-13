var sequelize = require('../database/database_connection.js')

module.exports = function createCall (request, response, next) {
  console.log('CREATE CALL')

  var midia = request.body.encoded_string

  /* {"data":"11-27-2015","horario":"15:15:00","lat":"-3.116528","lon":"-60.021731","sinistroId":"1"}
  */
  var sinistroId = request.body.json.sinistroId
  var data = request.body.json.data
  var horario = request.body.json.horario
  var latitude = request.body.json.lat
  var longitude = request.body.json.lon
  var endereco = request.body.json.formatted_address

  var query = `INSERT INTO chamada(DATA, HORARIO, LAT, LON, ENDERECO, ID_SINISTRO, MIDIA) VALUES
    ('${data}', '${horario}', ${latitude}, ${longitude}, '${endereco}', ${sinistroId}, '${midia}');`

  console.log('-------------------------')
  console.log(query)
  console.log('-------------------------')

  sequelize.query(query, {type: sequelize.QueryTypes.INSERT})
    .then(function (result) {
      console.log('ok')
    })
    .catch(function (error) {
      console.log(error)
    })
}
