import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/palettes'
import { validation } from './../middleware/palette.middleware'

const router = Router()

router.get('/', getAll)

router.get('/:paletteId', get)

router.post('/', validation, post)

router.patch('/:paletteId', patch)

router.delete('/:paletteId', remove)

export default router