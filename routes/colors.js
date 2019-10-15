const express = require('express')
const router = express.Router()
const Color = require('./../models/Color.js')

router.get('/', (req, res, next) => {
  Color.find().limit(50).exec()
    .then(docs => {
      console.log(docs)
      // if (docs.lenght >= 0) {
      res.status(200).json(docs)
      // } else {
      //     res.status(404).json({
      //       message: 'Nous avons rien trouver ... '
      //     })
      // }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.get('/:colorId', (req, res, next) => {
  const id = req.params.colorId
  Color.findById(id).exec()
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
  const color = new Color({
    red: req.body.red,
    blue: req.body.blue,
    green: req.body.green,
    alpha: req.body.alpha,
    name: req.body.name
  })
  color.save().then(result => {
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

router.patch('/:colorId', (req, res, next) => {
  const id = req.params.colorId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Color.updateOne({ _id: id }, { $set: updateOps })
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

router.delete('/:colorId', (req, res, next) => {
  const id = req.params.colorId
  Color.remove({ _id: id }).exec()
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