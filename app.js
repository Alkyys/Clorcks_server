import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import dotenv from 'dotenv'

const app = express();

// variables d'environements
dotenv.config()

app.use(morgan('dev'))

// connection a la BD
connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) return console.log(err)
})
set('useCreateIndex', true)

app.use(urlencoded({
  extended: false
}));
app.use(json());

//gestion de cors errors  
// TODO: restreindre les droits cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

import colorRoutes from './routes/colors';
import paletteRoutes from './routes/palettes';
import gradientRoutes from './routes/gradients';
import usersRoutes from './routes/users';
import workspacesRoutes from './routes/workspaces';
import auth from './middleware/auth';

app.use('/color', colorRoutes)
app.use('/palette', paletteRoutes)
app.use('/gradient', gradientRoutes)
app.use('/user', usersRoutes)
app.use('/workspace', auth, workspacesRoutes)

//middleware qui gere les requetes innexistante
app.use((next) => {
  const error = new Error('Not found')
  console.log(`🤷‍♂️ mec ta requete n'existe pas 🤷‍♂️`);
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

export default app