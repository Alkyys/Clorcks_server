import { Schema, model } from 'mongoose';

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
  createdAt: {
    type: Date,
    default: Date.now
  },
  workspace_id: {
    type: ObjectId,
    required: true,
    ref: 'Workspace'
  },
  label: {
    type: String
  },
  likeCount: {
    type: Number,
    default: 0
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

// methode de verification user_id
GradiantSchema.methods.isOwnwer = function ({ _id: userId }) {
  return this._id === userId
}


export default model('Gradient', GradiantSchema)
