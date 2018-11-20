var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var coordinates = require("./controllers/coordinates");
var settings = require("./controllers/settings");
var music = require("./controllers/music");
var database = require('./config/database');


app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname.slice(0, -('server'.length)), 'public')));

app.post('/coordinates', coordinates.add);
app.get('/music', music.all);
app.get('/settings', settings.get);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error444');
});

database.connect();

module.exports = app;