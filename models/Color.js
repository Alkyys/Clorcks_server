import { Schema, model } from 'mongoose';

const ColorSchema = new Schema({
  red: {
    type: Number,
    required: true
  },
  blue: {
    type: Number,
    required: true
  },
  green: {
    type: Number,
    required: true
  },
  alpha: {
    type: Number,
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default model('Color', ColorSchema)
