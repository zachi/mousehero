let mongoose = require('mongoose')
let coordinateSchema = new mongoose.Schema({
  userId: String,
  blockNumber: String,
  sessionDate: Date,
  stimuliSet: String, 
  taskType: String,
  x:Number,
  y:Number,
  timestamp:Number,
  duration:Number,
  stimulusName: String,
  stimulusType: String,
  stimulusGender: String,
  image:String

})
module.exports = mongoose.model('Coordinate', coordinateSchema)
