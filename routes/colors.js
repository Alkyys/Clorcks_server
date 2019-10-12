const express = require('express')
const router = express.Router()

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'GET methode from colors'
  })
})

router.get('/:colorId',(req, res, next) => {
  const id = req.params.colorId
  res.status(200).json({
    message: 'GET methode from colors with ' + id
  })
})

router.post('/',(req, res, next) => {
  const color = {
    red: req.body.red,
    blue: req.body.blue,
    green: req.body.green,
    alpha: req.body.alpha,
    likeCount: req.body.likeCount,
    name: req.body.name,
    createOn: req.body.createOn,
  }
  res.status(201).json({
    message: 'POST methode from colors',
    resultat: color
  })
})

router.delete('/',(req, res, next) => {
  res.status(201).json({
    message: 'DELETE methode from colors'
  })
})
module.exports = router