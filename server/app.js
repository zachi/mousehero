var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var coordinatesRouter = require('./routes/coordinates');
var musicRouter = require('./routes/music');
var app = express();
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname.slice(0, -('server'.length)), 'public')));
app.use('/coordinates', coordinatesRouter);
app.use('/music', musicRouter);

// app.get("/appcache.manifest", function (req, res) {
//   res.contentType("text/cache-manifest");

//   var contents = fs.readFileSync(path.join(__dirname, '../../public/appcache.manifest'));
//   res.end(cachefile.all());

// });

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


module.exports = app;