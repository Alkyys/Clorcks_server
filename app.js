const express = require('express')
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose')

// variables d'environements
require('dotenv').config()

app.use(morgan('dev'))

// connection a la BD
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log(err)
})
 mongoose.set('useCreateIndex', true)

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

//gestion de cors errors  
// TODO: restreindre les droits cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.methode === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// my routes
const colorsRoutes = require('./routes/colors')
const palettesRoutes = require('./routes/palettes')
const gradiantsRoutes = require('./routes/gradiants')
const usersRoutes = require('./routes/users')
app.use('/colors', colorsRoutes)
app.use('/palettes', palettesRoutes)
app.use('/gradiants', gradiantsRoutes)
app.use('/users', usersRoutes)

//middleware qui gere les requetes innexistante
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app