import { Router } from 'express'
import { getAll, get, signup, login, patch, del } from './../controllers/users'

const router = Router()

router.get('/', getAll)

router.get('/:usersId', get)

router.post('/signup', signup)

router.post('/login', login)

router.patch('/:userId', patch)

router.delete('/:usersId', del)

export default router