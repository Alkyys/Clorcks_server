import { Router } from 'express'
import { poplateOne, getAll, getMyGradient, getMyPalette, getMy, post, patch, addColor, remove, removeColor } from './../controllers/workspaces'
import auth from './../middleware/auth'

const router = Router()

router.get('/', auth, getAll)

// router.get('/:workspaceId', get)

router.get('/:workspaceId/gradient', auth, getMyGradient)

router.get('/:workspaceId/palette', auth, getMyPalette)

router.post('/', auth, post)

router.patch('/:workspaceId', auth, patch)

router.put('/:workspaceId', auth, poplateOne, addColor)

router.delete('/:workspaceId/color/:colorId', auth, poplateOne, removeColor)

router.delete('/:workspaceId', auth, remove)

export default router