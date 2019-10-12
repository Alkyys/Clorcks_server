const express = require('express')
const router = express.Router()

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'GET methode from gradiants'
  })
})

router.get('/:gradiantsId',(req, res, next) => {
  res.status(200).json({
    message: 'GET methode from gradiants with ' + req.params.gradiantsId
  })
})

router.post('/',(req, res, next) => {
  const gradiant = {
    user_id: req.body.user_id,
    stops: req.body.stops,
    user_id: req.body.label,

  }
  res.status(201).json({
    message: 'POST methode from gradiants',
    resultat: gradiant
  })
})

router.delete('/:gradiantsId',(req, res, next) => {
  res.status(201).json({
    message: 'DELETE methode from gradiants' + req.params.gradiantsId
  })
})

module.exports = router