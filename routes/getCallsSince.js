var sequelize = require('../database/database_connection.js')

module.exports = function getCallsSince (request, response, next) {
  console.log('GET CALLS')

  var startTime = request.params.startTime
  var startDate = request.params.startDate

  // DONE:20 calls should be returned in order by as the last on the list is the newest
  /* DONE:60 change date and time presentation to
    API format (date: yyyyddmm; time:hhmmss) */
  // DONE:40 TEST request API with POSTMAN

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
  /* select id, to_char(chamada.data, 'MM-DD-YYYY') as data, horario, lat, lon, id_sinistro, midia
from chamada where data>='11-27-2015' and horario > '14:00:00' ORDER BY chamada.data, horario;*/
  var query = `SELECT id, to_char(chamada.data, 'MM-DD-YYYY') as data, horario, lat, lon, id_sinistro, endereco
FROM chamada WHERE data>='${startDate}' AND horario >= '${startTime}' ORDER BY chamada.data, horario;`

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
