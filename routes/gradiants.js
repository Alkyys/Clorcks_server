const express = require('express')
const router = express.Router()
const Gradiant = require('./../models/Gradient.js')

router.get('/', (req, res, next) => {
  Gradiant.find().limit(50)
    .populate('color')
    .populate('user_id', 'name')
    .exec()
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

router.get('/:gradiantId', (req, res, next) => {
  const id = req.params.gradiantId
  Gradiant.findById(id)
    .populate('color')
    .populate('user_id', 'name')
    .exec()
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

router.post('/', (req, res, next) => {
  const gradiant = new Gradiant({
    user_id: req.body.user_id,
    stops: req.body.stops,
    label: req.body.label,
  })
  gradiant.save().then(result => {
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

router.patch('/:gradiantId', (req, res, next) => {
  const id = req.params.gradiantId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Gradiant.updateOne({
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

router.delete('/:gradiantsId', (req, res, next) => {
  const id = req.params.gradiantsId
  Gradiant.remove({
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