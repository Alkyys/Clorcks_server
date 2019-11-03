import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/palettes'
import auth from './../middleware/auth'

const router = Router()

router.get('/', getAll)

router.get('/:paletteId', get)

router.post('/',auth, post)

router.patch('/:paletteId',auth, patch)

router.delete('/:paletteId',auth, remove)

export default router