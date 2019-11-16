import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/palettes'
import auth from './../middleware/auth'
import { validation } from './../middleware/palette.middleware'

const router = Router()

router.get('/', getAll)

router.get('/:paletteId', get)

router.post('/',auth, validation, post)

router.patch('/:paletteId',auth, patch)

router.delete('/:paletteId',auth, remove)

export default router