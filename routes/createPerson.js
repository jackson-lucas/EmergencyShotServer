var sequelize = require('../database/database_connection.js');

function createPerson (request, response, next) {
  console.log("CREATE PERSON");

  var nome = request.body.nome;
  var googleId = request.body.googleId;
  var telefone = request.body.telefone;

  var query = `INSERT INTO pessoa(NOME, GOOGLE_ID, TELEFONE) VALUES ('${nome}', '${googleId}', '${telefone}');`;
  console.log(query);

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

module.exports = createPerson;