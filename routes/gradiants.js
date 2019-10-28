const express = require('express')
const router = express.Router()
const GradiantControlleur = require('./../controllers/gradiants')

router.get('/', GradiantControlleur.getAll)

router.get('/:gradiantId', GradiantControlleur.get)

router.post('/', GradiantControlleur.post)

router.patch('/:gradiantId', GradiantControlleur.patch)

router.delete('/:gradiantsId', GradiantControlleur.remove)

module.exports = router