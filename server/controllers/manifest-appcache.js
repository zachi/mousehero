var cachefile = require("../models/manifest-appcache")

module.exports = (function () {

  return {
    generateFile: function () {

      var res = cachefile.generate();

      var fs = require('fs');
      fs.writeFile("../public/manifest.appcache", res, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }

  }
})();