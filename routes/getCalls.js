var sequelize = require('../database/database_connection.js');

module.exports = function createCall (request, response, next) {

  console.log("CREATE CALL");

  var startTime = request.params.startTime;
  var startDate = request.params.startDate;
  var endTime = request.params.endTime;
  var endDate = request.params.endDate;

  // TODO Create SQL Injection Prevetion Module
  /* TODO change date and time presentation to
    API format (date: yyyyddmm; time:hhmmss) */
  // DOING:0 TEST request API with POSTMAN

  /* select id, google_id, to_char(chamada.data, 'YYYYDDMM') as data,
to_char(chamada.horario, 'HH24MISS') as horario, lat, lon, midia, id_sinistro
from chamada where chamada.data>='20151127' and chamada.data<='20151127' and
chamada.horario <= '153000' and chamada.horario > '140000';*/
  var query = `SELECT id, google_id, to_char(chamada.data, 'YYYYDDMM') as data,
to_char(chamada.horario, 'HH24MISS') as horario, lat, lon, midia, id_sinistro
FROM chamada WHERE data>='${startDate}'
    AND data<='${endDate}' AND horario <= '${endTime}'
    AND horario >= '${startTime}';`;

  console.log("-------------------------");
  console.log(query);
  console.log("-------------------------");
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(function(result) {
      console.log(result);
      response.send(result)
    })
    .catch(function (error) {
      console.log(error);
      response.send("400")
    });
};