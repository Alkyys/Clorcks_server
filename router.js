import { Router } from 'express'

import ColorController from './controllers/ColorController'

const router = new Router()

// Colors
router.get('/color', ColorController.list)
router.post('/color', ColorController.create)
router.get('/color/:id', ColorController._populate, ColorController.fetch)
router.patch('/color/:id', ColorController._populate, ColorController.update)
router.delete('/color/:id', ColorController._populate, ColorController.remove)

// TODO: Gérer les erreurs
// router.use(errorHandler)

export default router