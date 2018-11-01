var music = require("../models/music")
var fs = require('fs')

module.exports = (function () {

  return {
    all: function (req, res, next) {
      res.json(music.all());
    },
    generateFile: function () {
      fs.writeFile("../public/music/list.json", JSON.stringify(music.all()), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("music/list.json file was saved!");
      });
    }
  }
})();