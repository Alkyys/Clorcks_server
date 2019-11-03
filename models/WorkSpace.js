import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const WorkSpaceSchema = new Schema({
  colors_id: {
    type: [ObjectId],
    ref: 'Colors'
  },
  palettes_id: {
    type: [ObjectId],
    ref: 'Palette'
  },
  gradients_id: {
    type: [ObjectId],
    ref: 'Gradient'
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

export default model('Workspace', WorkSpaceSchema)
