var cachefile = require("../models/manifest-appcache")
var fs = require('fs');
const config = require('../config/config');

module.exports = (function () {

  return {
    generateFile: function () {
      var res = cachefile.generate();
      fs.writeFile( config.rootFolderAbsolutePath + '/public/manifest.appcache', res, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("file was updated successfully!");
      });
    }

  }
})();