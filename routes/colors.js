import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/colors'
import auth from './../middleware/auth'

const router = Router()

router.get('/', getAll)

router.get('/:colorId', get)

router.post('/',auth, post)

router.patch('/:colorId',auth, patch)

router.delete('/:colorId',auth, remove)

export default router