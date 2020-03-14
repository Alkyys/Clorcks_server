import { Router } from 'express'
import { getAll, get, getMy, post, patch, remove } from './../controllers/palettes'
import auth from './../middleware/auth'
import { validation } from './../middleware/palette.check'

const router = Router()

router.get('/', getAll)

router.get('/:paletteId', get)

router.get('/my/:workspaceId', auth, getMy)

router.post('/', auth, validation, post)

router.patch('/:paletteId', auth, patch)

router.delete('/:paletteId', auth, remove)

export default router