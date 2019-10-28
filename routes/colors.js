const express = require('express')
const router = express.Router()
const ColorController = require('./../controllers/colors')

router.get('/', ColorController.getAll)

router.get('/:colorId', ColorController.get)

router.post('/', ColorController.post)

router.patch('/:colorId', ColorController.patch)

router.delete('/:colorId', ColorController.remove)

module.exports = router