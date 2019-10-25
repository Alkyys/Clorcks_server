const express = require('express')
const router = express.Router()
const PaletteController = require('./../controllers/palettes')

router.get('/', PaletteController.getAll)

router.get('/:paletteId', PaletteController.get)

router.post('/', PaletteController.post)

router.patch('/:paletteId', PaletteController.patch)

router.delete('/:paletteId', PaletteController.delete)

module.exports = router