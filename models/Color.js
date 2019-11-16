import { Schema, model } from 'mongoose';

const ColorSchema = new Schema({
  red: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  blue: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  green: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  alpha: {
    type: Number,
    required: true,
    min: 0,
    max: 100
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
