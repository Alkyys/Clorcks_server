import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/palettes'

const router = Router()

router.get('/', getAll)

router.get('/:paletteId', get)

router.post('/', post)

router.patch('/:paletteId', patch)

router.delete('/:paletteId', remove)

export default router