import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/gradiants'

const router = Router()

router.get('/', getAll)

router.get('/:gradiantId', get)

router.post('/', post)

router.patch('/:gradiantId', patch)

router.delete('/:gradiantsId', remove)

export default router