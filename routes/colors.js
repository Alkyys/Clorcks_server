import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/colors'
import { validation } from './../middleware/color.middleware'

const router = Router()

router.get('/', getAll)

router.get('/:colorId', get)

router.post('/', validation, post)

router.patch('/:colorId', patch)

router.delete('/:colorId', remove)

export default router