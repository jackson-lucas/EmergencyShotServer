var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); // NOT USING
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // NOT USING
var bodyParser = require('body-parser');
var sqlinjection = require('sql-injection');

// API ROUTES
var createPerson = require('./routes/createPerson');
var createCall = require('./routes/createCall');
var getCalls = require('./routes/getCalls');

var app = express();

// Protection Modules
//app.use(sqlinjection);

// TODO check how to make https connections with node

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// API Routes
// POST
app.post('/createPerson', createPerson);
app.post('/createCall', createCall);

// GET
app.get('/getCalls/:startDate/:startTime/:endDate/:endTime', getCalls);


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
