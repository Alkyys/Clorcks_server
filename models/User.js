import { Schema, model } from 'mongoose'

const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true, 
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  likes: {
    type: [{
      type: ObjectId
    }]
  }
})

export default model('User', UserSchema)
