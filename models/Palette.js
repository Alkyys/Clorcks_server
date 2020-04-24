import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const PaletteSchema = new Schema({
  likeCount: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    required: true
  },
  colors_id: {
    type: [{
      type: ObjectId,
      ref: 'Color'
    }],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  workspace_id: {
    type: ObjectId,
    required: true,
    ref: 'Workspace'
  }
})

function arrayLimit (val) {
  return val.length >= 2 && val.length <= 5
}

// methode de verification user_id
PaletteSchema.methods.isOwnwer = function ({ _id: userId }) {
  return this._id === userId
}

export default model('Palette', PaletteSchema)
