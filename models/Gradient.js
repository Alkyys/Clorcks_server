import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const StopSchema = new Schema({
  color: {
    type: ObjectId,
    ref: 'Color'
  },
  position: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  }
}, { _id: false })

const GradiantSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  label: {
    type: String
  },
  stops: [{
    type: StopSchema,
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit']
  }],
})


function arrayLimit (val) {
  return val.length >= 2 && val.length <= 24
}

export default model('gradiant', GradiantSchema)
