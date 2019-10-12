const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET methode from palettes'
  })
})

router.get('/:palettesId', (req, res, next) => {
  res.status(200).json({
    message: 'GET methode from palettes with ' + req.params.palettesId
  })
})

router.post('/', (req, res, next) => {
  const palette = {
    user_id: req.body.user_id,
    label: req.body.label,
    color_id: req.body.color_id
  }
  res.status(201).json({
    message: 'POST methode from palettes',
    resultat: palette
  })
})

router.delete('/:palettesId', (req, res, next) => {
  res.status(201).json({
    message: 'DELETE methode from palettes' + req.params.palettesId
  })
})

module.exports = router