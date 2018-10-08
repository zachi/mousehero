let mongoose = require('mongoose')
let sessionSchema = new mongoose.Schema({
  userId: String,
  number: String,
  date: Date,
  stimuliSet: String,
  taskType: String,
  mouseMovements: Array
})
module.exports = mongoose.model('Session', sessionSchema)
