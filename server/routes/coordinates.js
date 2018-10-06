var express = require('express');
var router = express.Router();
var coordinates = require("../controllers/coordinates")
/* GET home page. */
router.post('/', coordinates.add);

module.exports = router;
