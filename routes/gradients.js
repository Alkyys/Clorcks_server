import { Router } from 'express'
import { getAll, get, getMy, post, patch, remove } from '../controllers/gradients'
import { validation } from './../middleware/gradient.check'
import auth from './../middleware/auth'

const router = Router()

router.get('/', getAll)

router.get('/:gradientId', get)

router.get('/my/:workspaceId', auth, getMy)

router.post('/', auth, validation, post)

router.patch('/:gradientId', auth, patch)

router.delete('/:gradientId', auth, remove)

export default router