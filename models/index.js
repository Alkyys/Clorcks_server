const mongoose = require('mongoose');
const path = require('path');

//import des models
const Color = require('./Color');
const Gradiant = require('./Gradient');
const Palette = require('./Palette');
const User = require('./User');
const WorkSpace = require('./WorkSpace');
const models = {
  Color,
  Gradiant,
  Palette,
  User,
  WorkSpace
};

//connection a la base de donnes
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.log(err)
  })
};

module.exports = {
  connectDb,
  models
};
//module.exports = {models} ;