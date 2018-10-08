let mongoose = require('mongoose')
let coordinateSchema = new mongoose.Schema({
  userId: String,
  sessionNumber: String,
  sessionDate: Date,
  stimuliSet: String, 
  taskType: String,
  x:Number,
  y:Number,
  // location: {
  //   type: {
  //     type: String, 
  //     enum: ['Point'], 
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // },
  timestamp:Number,
  duration:Number,
  stimulusName: String,
  stimulusType: String,
  stimulusGender: String

})
module.exports = mongoose.model('Coordinate', coordinateSchema)
