import { Router } from 'express'
import { getAll, get, post, patch, remove } from './../controllers/workspaces'
import auth from './../middleware/auth'

const router = Router()

router.get('/', getAll)

router.get('/:workspaceId', get)

router.post('/',auth, post)

router.patch('/:workspaceId',auth, patch)

router.delete('/:workspaceId',auth, remove)

export default router