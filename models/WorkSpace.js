import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const WorkSpaceSchema = new Schema({
  colors_id: {
    type: [ObjectId],
    default: undefined,
    ref: 'Colors',
    required: true
  },
  user_id: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  colorsLike_id: {
    type: [ObjectId],
    default: undefined,
    ref: 'Colors',
    required: true
  },
  palettesLike_id: {
    type: [ObjectId],
    default: undefined,
    ref: 'Palette',
    required: true
  },
  gradientsLike_id: {
    type: [ObjectId],
    default: undefined,
    ref: 'Gradiant',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  name:{
    type: String,
    required: true
  }
})

export default model('workspace', WorkSpaceSchema)
