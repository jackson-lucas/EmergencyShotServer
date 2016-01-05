//var sequelize = require('../database/database_connection.js');

module.exports = function createCall (request, response, next) {

  console.log("CREATE CALL");
  console.log("-------------------------");


  console.log(typeof request.body.json);
console.log("-------------------------");
  //var midia = request.body.encoded_string;
  var jsonData = JSON.parse(request.body.json);

  /*
  {"data":"11-27-2015","horario":"15:15:00","lat":"-3.116528","lon":"-60.021731","sinistroId":"1"}
  */
  var sinistroId = jsonData.sinistroId;
  var data = jsonData.data;
  var horario = jsonData.horario;
  var latitude = jsonData.lat;
  var longitude = jsonData.lon;

  var query = `INSERT INTO chamada(DATA, HORARIO, LAT, LON, ID_SINISTRO) VALUES
    ('${data}', '${horario}', ${latitude}, ${longitude}, ${sinistroId});`;
  response.send(query);
  // console.log("-------------------------");
  // console.log(query);
  // console.log("-------------------------");
  //
  // sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
  //   .then(function(result) {
  //     console.log(result);
  //     response.send(result);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     response.send(result);
  //   });
  //

};