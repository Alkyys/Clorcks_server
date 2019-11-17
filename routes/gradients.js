import { Router } from 'express'
import { getAll, get, post, patch, remove } from '../controllers/gradients'
import { validation } from './../middleware/gradient.check'
import auth from './../middleware/auth'

const router = Router()

router.get('/', getAll)

router.get('/:gradientId', get)

router.post('/', auth, validation, post)

router.patch('/:gradientId', auth, patch)

router.delete('/:gradientsId', auth, remove)

export default router