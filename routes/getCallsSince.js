var sequelize = require('../database/database_connection.js');

module.exports = function createCall (request, response, next) {

  console.log("GET CALLS");

  var startTime = request.params.startTime;
  var startDate = request.params.startDate;
  // TODO calls should be returned in order by as the last on the list is the newest
  // TODO:0 Create SQL Injection Prevetion Module
  /* DONE:10 change date and time presentation to
    API format (date: yyyyddmm; time:hhmmss) */
  // DONE:0 TEST request API with POSTMAN

/*
Date database format
show datestyle;                                                      DateStyle
-----------
 ISO, MDY
(1 row)

test_node=# select current_date;
date
------------
2015-12-31
(1 row)
*/
  /* select id, to_char(chamada.data, 'MM-DD-YYYY') as data, horario, lat, lon, midia, id_sinistro
from chamada where data>='11-27-2015' and horario > '14:00:00';*/
  var query = `SELECT id, to_char(chamada.data, 'MM-DD-YYYY') as data, horario, lat, lon, midia, id_sinistro
FROM chamada WHERE data>='${startDate}' AND horario >= '${startTime}';`;

  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(function(result) {
      console.log(result);
      response.send(result)
    })
    .catch(function (error) {
      console.log('ERROR --------------------------');
      console.log(error);
      response.send("ERROR")
    });
};