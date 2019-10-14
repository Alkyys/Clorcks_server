const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const GradiantSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  label: {
    type: String
  },
  stops: [{
    type: new mongoose.Schema({
      color: {
        type: ObjectId,
        required: true,
        ref: 'Colors'
      },
      position: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      }
    }),
    validate: [arrayLimit, '{PATH} exceeds the limit']
  }]
})


function arrayLimit (val) {
  return val.length >= 2 && val.length <= 24
}

module.exports = mongoose.model('gradiant', GradiantSchema)
