const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('./../models/User.js')

router.get('/', (req, res, next) => {
  User.find().limit(200).exec()
    .then(docs => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.get('/:usersId', (req, res, next) => {
  const id = req.params.usersId
  User.findById(id).exec()
    .then(doc => {
      console.log(doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: 'Nous avons rien trouver ... '
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/signup', (req, res, next) => {
  const user = new User({
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email
  })
  user.save()
    .then(result => {
      res.status(201).json({
        result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/login', (req, res, next) => {
  console.log(req.body.email)
  User.findOne({ email: 'alkyys@gmail.com' }).exec()
    .then(user => {
      console.log(user) // TODO: fix problem user vide
      if (!user.length) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      const token = jwt.sign({
        email: req.body.email,
        name: req.body.name
      }, process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }) // TODO: JWT refrech
      return res.status(200).json({
        message: "Auth successful",
        token: token,
        body: req.body
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.patch('/:userId', (req, res, next) => {
  const id = req.params.userId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  User.updateOne({
    _id: id
  }, {
    $set: updateOps
  })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:usersId', (req, res, next) => {
  const id = req.params.usersId
  User.remove({
    _id: id
  }).exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router