import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/gradiants'
import { validation } from './../middleware/gradient.middleware'

const router = Router()

router.get('/', getAll)

router.get('/:gradiantId', get)

router.post('/', validation, post)

router.patch('/:gradiantId', patch)

router.delete('/:gradiantsId', remove)

export default router