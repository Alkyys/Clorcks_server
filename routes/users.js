const express = require('express')
const router = express.Router()
const UserController = require('./../controllers/users')

router.get('/', UserController.getAll)

router.get('/:usersId', UserController.get)

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.patch('/:userId', UserController.patch)

router.delete('/:usersId', UserController.del)

module.exports = router