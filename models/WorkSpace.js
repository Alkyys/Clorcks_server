import { Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId

const WorkSpaceSchema = new Schema({
  red: {
    type: Number,
    required: true
  },
  colors_id: {
    type: [ObjectId],
    default: undefined,
    ref: 'Colors',
    required: true
  },
  likes: {
    type: [ObjectId],
    default: undefined,
    ref: 'Colors',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model('workspace', WorkSpaceSchema)
