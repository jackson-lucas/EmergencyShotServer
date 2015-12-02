var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sequelize = require('./database/database_connection.js');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/create_pessoa/:nome/:email/:telefone', function createPerson (req, res, next) {
  console.log("CREATE PERSON");

  var nome = req.params.nome;
  var email = req.params.email;
  var telefone = req.params.telefone;

  var query = `INSERT INTO pessoa(NOME, EMAIL, TELEFONE) VALUES ('${nome}', '${email}', '${telefone}');`;
  console.log(query);

  sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
    .then(function(result) {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    });

  res.render('index', { title: 'Create Person' });
});
/*
app.post('/personjson', jsonParser, function(req, res) {
  res.send('Thank you for the JSON data!');
  console.log(req.body.firstname);
  console.log(req.body.lastname);
});*/

app.use('/create_call/:email/:sinistro/:data/:horario/:lat/:lon/:midia', function createCall (req, res, next) {

  console.log("CREATE CALL");

  var email = req.params.email;
  var sinistro = req.params.sinistro;
  var data = req.params.data;
  var horario = req.params.horario;
  var latitude = req.params.lat;
  var longitude = req.params.lon;
  var midia = req.params.midia; // BLOB

  var query = `INSERT INTO denuncia(EMAIL, DATA, HORARIO, LAT, LON) VALUES ('${email}', '${data}', '${horario}', ${latitude}, ${longitude});`;

  console.log("-------------------------");
  console.log(query);
  console.log("-------------------------");

  sequelize.query(query, { type: sequelize.QueryTypes.INSERT})
    .then(function(result) {
      console.log(result);
    })
    .catch(function (error) {
      console.log(error);
    });

  res.render('index', { title: 'Create Denuncia' });
});

app.use('/get_call/:time/:intervalTime', function getCallByTime (req, res, next) {
  var time = req.params.time;
  var intervalTime = req.params.intervalTime;
  console.log(time, intervalTime);
  res.render('index', { title: 'Create Call By Time' });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
