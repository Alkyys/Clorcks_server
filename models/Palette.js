const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const PaletteSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  likeCount: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  colors_id: {
    type: [{
      type: ObjectId,
      ref: 'Colors'
    }],
    required: true,
    default: null,
    validate: [arrayLimit, '{PATH} exceeds the limit']
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

function arrayLimit (val) {
  return val.length >= 2 && val.length <= 5
}

module.exports = mongoose.model('palette', PaletteSchema)
