const express = require('express')
const router = express.Router()
const UserController = require('./../controllers/users')

router.get('/', UserController.getAll)

router.get('/:usersId', UserController.get)

router.post('/signup', UserController.postSignup)

router.post('/login', UserController.postLogin)

router.patch('/:userId', UserController.patch)

router.delete('/:usersId', UserController.delete)

module.exports = router