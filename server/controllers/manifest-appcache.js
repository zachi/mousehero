var cachefile = require("../models/manifest-appcache")
var fs = require('fs');
const settings = require('../config/settings');

module.exports = (function () {

  return {
    generateFile: function () {
      var res = cachefile.generate();
      fs.writeFile( settings.rootFolderAbsolutePath + '/public/manifest.appcache', res, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }

  }
})();