let mongoose = require('mongoose');
var debug = require('debug')('mousehero:server');
var config = require('./config');

exports.connect = function () {
  mongoose.connect(`mongodb://${config.db.connection}/${config.db.name}`, { useNewUrlParser: true })
    .then(() => {
      debug('Database connection successful')
    })
    .catch(err => {
      debug('Database connection error')
    })
}