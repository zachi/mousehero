var Session = require("../models/session")

exports.register = function (req, res, next) {

	Session.create(req.body, (err) => {
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