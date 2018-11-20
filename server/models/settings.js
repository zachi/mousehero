let mongoose = require('mongoose')
let settingsSchema = new mongoose.Schema({
  matrixMagnifierLayers: [{
    diameter: Number,
    blurIntensity: Number,
    zIndex: Number
  }],
  matrixBlurIntensity: Number,
  matrixDisplayDurationTraining: Number,
  matrixDisplayDurationMeasurement: Number

}, { collection: 'settings' })
module.exports = mongoose.model('Settings', settingsSchema)