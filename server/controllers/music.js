var music = require("../models/music")

exports.all = function (req, res, next) {

	res.json( music.all());

}