import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const WorkSpaceSchema = new Schema({
  colors_id: {
    type: [{
      type: ObjectId,
      ref: 'Color'
    }],
    default: []
  },
  user_id: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  colorsLike_id: {
    type: [ObjectId],
    ref: 'Colors'
  },
  palettesLike_id: {
    type: [ObjectId],
    ref: 'Palette'
  },
  gradientsLike_id: {
    type: [ObjectId],
    ref: 'Gradiant'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  }
})

// methode de verification user_id
WorkSpaceSchema.methods.isOwnwer = function ({ _id: userId }) {
  return this._id === userId
}


export default model('Workspace', WorkSpaceSchema)
