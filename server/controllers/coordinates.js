var Coordinate = require("../models/coordinate")

exports.add = function (req, res, next) {

	Coordinate.create(req.body, (err) => {
		if (err) {
			console.error(err)
			res.json({
				success: false
			})
			return
		}
		res.json({
			success: true
		})
		return
	})
}