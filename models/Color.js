const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  red: {
    type: Number,
    required: true
  },
  blue: {
    type: Number,
    required: true
  },
  green: {
    type: Number,
    required: true
  },
  alpha: {
    type: Number,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Color', ColorSchema)
