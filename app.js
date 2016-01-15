var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser') // NOT USING
var bodyParser = require('body-parser')
var multer = require('multer') // form multi-form data

var upload = multer({ dest: 'uploads/' })

// API ROUTES
var createCall = require('./routes/createCall')
var getCallsSince = require('./routes/getCallsSince')

var getAddressRequest = require('./requests/getAddressRequest')

var app = express()

// TODO:30 ENHANCEMENT check how to make https connections with node

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// TODO:10 ENHANCEMENT create flag isTrote on database and filter calls based on this.
app.use(logger('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// API Routes
// POST
app.post('/createCall', upload.single('encoded_string'), getAddressRequest, createCall)

// GET
app.get('/getCallsSince/:startDate/:startTime', getCallsSince)

// catch 404 and forward to error handler
app.use(function (request, response, next) {
  var error = new Error('Not Found')
  error.status = 404
  next(error)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (error, request, response, next) {
    response.status(error.status || 500)
    response.render('error', {
      message: error.message,
      error: error
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (error, request, response, next) {
  response.status(error.status || 500)
  response.render('error', {
    message: error.message,
    error: {}
  })
})

module.exports = app
