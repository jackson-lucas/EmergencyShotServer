var sequelize = require('../database/database_connection.js')

module.exports = function getCalls (request, response, next) {
  console.log('CREATE CALL')

  var startTime = request.params.startTime
  var startDate = request.params.startDate
  var endTime = request.params.endTime
  var endDate = request.params.endDate

  // TODO:0 Create SQL Injection Prevetion Module
  /* DONE:50 change date and time presentation to
    API format (date: yyyyddmm; time:hhmmss) */
  // DONE:30 TEST request API with POSTMAN

  /*
  Date database format
  show datestyle;                                                      DateStyle
  -----------
   ISO, MDY
  (1 row)

  test_node=# select current_date
  date
  ------------
  2015-12-31
  (1 row)
  */
  /* select id, google_id, data, horario, lat, lon, midia, id_sinistro
from chamada where data>='11-27-2015' and data<='11-27-2015' and
horario <= '15:30:00' and horario > '14:00:00';*/
  var query = `SELECT id, to_char(chamada.data, 'MM-DD-YYYY') as data, horario, lat, lon, id_sinistro, endereco, midia
FROM chamada WHERE data>='${startDate}'
    AND data<='${endDate}' AND horario <= '${endTime}'
    AND horario >= '${startTime}' ORDER BY chamada.data, horario;`

  sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(function (result) {
      console.log(result)
      response.send(result)
    })
    .catch(function (error) {
      console.log('ERROR --------------------------')
      console.log(error)
      response.send('ERROR')
    })
}
