import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/colors'

const router = Router()

router.get('/', getAll)

router.get('/:colorId', get)

router.post('/', post)

router.patch('/:colorId', patch)

router.delete('/:colorId', remove)

export default router