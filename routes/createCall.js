var sequelize = require('../database/database_connection.js');

module.exports = function createCall (request, response, next) {

  console.log("CREATE CALL");

  var googleId = request.body.googleId;
  var sinistroId = request.body.sinistroId;
  var data = request.body.data;
  var horario = request.body.horario;
  var latitude = request.body.lat;
  var longitude = request.body.lon;
  var midia = request.body.midia; // BLOB

  var query = `INSERT INTO chamada(GOOGLE_ID, DATA, HORARIO, LAT, LON, ID_SINISTRO) VALUES
    ('${googleId}', '${data}', '${horario}', ${latitude}, ${longitude}, ${sinistroId});`;

  console.log("-------------------------");
  console.log(query);
  console.log("-------------------------");

  sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
    .then(function(result) {
      console.log(result);
      response.send("200")
    })
    .catch(function (error) {
      console.log(error);
      response.send("400")
    });


};