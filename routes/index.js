var express = require('express');
var router = express.Router();
var sequelize = require("../database/database_connection");

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("INDEX");
  sequelize.query("SELECT * FROM pessoa", { type: sequelize.QueryTypes.SELECT})
    .then(function(pessoas) {
      console.log(pessoas);
      res.render('index', { title: 'Express' });
    })
});

module.exports = router;
