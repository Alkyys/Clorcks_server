const express = require('express')
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose')

// variables d'environements
require('dotenv').config()

// connection a la BD
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.log(err)
})
// TODO: resoudre le probleme de lien BD en string 

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

//gestion de cors errors
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
app.use('/colors', colorsRoutes)
app.use('/palettes', palettesRoutes)


app.use(morgan('dev'))

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