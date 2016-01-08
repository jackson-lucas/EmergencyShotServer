var sequelize = require('../database/database_connection.js');

module.exports = function getImage (request, response, next) {

  console.log("GET IMAGE");

  var id = request.params.id;

  /* select midia from chamada where id='2';*/
  var query = `SELECT midia FROM chamada WHERE id='${id}';`;

  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(function(result) {
      console.log(result[0]);
      response.send(result[0])
    })
    .catch(function (error) {
      console.log('ERROR --------------------------');
      console.log(error);
      response.send("ERROR")
    });
};