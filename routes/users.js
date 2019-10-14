const express = require('express')
const router = express.Router()
const User = require('./../models/User.js')

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET methode from users'
  })
})

router.get('/:usersId', (req, res, next) => {
  res.status(200).json({
    message: 'GET methode from users with ' + req.params.usersId
  })
})

router.post('/', (req, res, next) => {
  const user = {
    name: req.body.name
  }
  res.status(201).json({
    message: 'POST methode from users',
    resultat: user
  })
})

router.delete('/:usersId', (req, res, next) => {
  res.status(201).json({
    message: 'DELETE methode from users' + req.params.usersId
  })
})

module.exports = router