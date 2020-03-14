import { Router } from 'express'
import { poplateOne, getAll, get, getMy, post, patch, addColor, remove } from './../controllers/workspaces'
import auth from './../middleware/auth'

const router = Router()

router.get('/', getAll)

router.get('/:workspaceId', get)

router.get('/my/:userId', getMy)

router.post('/', auth, post)

router.patch('/:workspaceId', auth, patch)

router.put('/:workspaceId', auth, poplateOne, addColor)

router.delete('/:workspaceId', auth, remove)

export default router