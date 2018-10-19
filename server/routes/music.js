var express = require('express');
var router = express.Router();
var music = require('../models/music');

//router.get('/', music.all);
router.get('/', function (req, res, next) {
  res.json(music.all());
});

module.exports = router;
