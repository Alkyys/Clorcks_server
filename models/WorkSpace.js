const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId

const WorkSpaceSchema = new mongoose.Schema({
  red: {
    type: Number,
    required: true
  },
  colors_id: {
    type: [ObjectId],
    default: undefined,
    ref: 'Colors'
  },
  likes: {
    type: [ObjectId],
    default: undefined,
    ref: 'Colors'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('workspace', WorkSpaceSchema)
