var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var coordinatesRouter = require('./routes/coordinates');

var sessionsController = require('./controllers/sessions');
var database = require('./config/database');

var app = express();
var bodyParser = require('body-parser');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}))
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname.slice(0, -('server'.length)) , 'public')));

app.use('/', indexRouter);

//app.use('/sessions', sessionsController.register);
app.use('/coordinates', coordinatesRouter);

//app.use(bodyParser({limit: '50mb'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error444');
});


module.exports = app;
