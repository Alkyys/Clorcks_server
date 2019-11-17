import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/colors'
import auth from './../middleware/auth'
import { validation } from './../middleware/color.check'

const router = Router()

router.get('/', getAll)

router.get('/:colorId', get)

router.post('/', auth, validation, post)

router.patch('/:colorId',auth, patch)

router.delete('/:colorId',auth, remove)

export default router