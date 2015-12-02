var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); // NOT USING
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // NOT USING
var bodyParser = require('body-parser');
var sequelize = require('./database/database_connection.js');

// API ROUTES
var index = require('./routes/index');
var createPerson = require('./routes/createPerson');

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

app.use('/', index);

app.get('/getCallByIntervalTime', getCallByIntervalTime);

app.post('/createPerson', createPerson);
/*
app.post('/personjson', jsonParser, function(req, res) {
  res.send('Thank you for the JSON data!');
  console.log(req.body.firstname);
  console.log(req.body.lastname);
});*/

app.post('/createCall', createCall);

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(error, request, response, next) {
    response.status(error.status || 500);
    response.render('error', {
      message: error.message,
      error: error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, request, response, next) {
  response.status(error.status || 500);
  response.render('error', {
    message: error.message,
    error: {}
  });
});


module.exports = app;
