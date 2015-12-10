var sequelize = require('../database/database_connection.js');

module.exports = function createCall (request, response, next) {

  console.log("CREATE CALL");

  var date = request.body.data;
  var startTime = request.body.tempoInicio;
  var endTime = request.body.tempoFim;

  // TODO Create SQL Injection Prevetion Module
  // TEST request API with POSTMAN

  // select * from chamada where data='20151127' and horario <= '153000' and horario > '140000' ;
  var query = `SELECT * FROM chamada WHERE data='${date}' AND
    horario <= '${endTime}' AND horario > '${startTime}');`;

  console.log("-------------------------");
  console.log(query);
  console.log("-------------------------");

  sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
    .then(function(result) {
      console.log(result);
      response.send("200")
    })
    .catch(function (error) {ˇ
      console.log(error);
      response.send("400")
    });


};