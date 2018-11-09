let mongoose = require('mongoose');
var debug = require('debug')('mousehero:server');
var settings = require('./settings');

exports.connect = function () {
  mongoose.connect(`mongodb://${settings.db.connection}/${settings.db.name}`, { useNewUrlParser: true })
    .then(() => {
      debug('Database connection successful')
    })
    .catch(err => {
      debug('Database connection error')
    })
}