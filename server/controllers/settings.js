// var Settings = require("../models/settings")

// exports.get = function (req, res, next) {

//   Settings.find({}, (err, result) => {
//     if (err)
//       return res.status(200).send(err)
//     return res.json(result)
//   });

// }
var Settings = require("../models/settings.json")

exports.get = function (req, res, next) {
    return res.json(Settings)
}