import { Router } from 'express'
import Workspace from '../controllers/workspaces';
import Gradient from '../controllers/gradients';
import Palette from '../controllers/palettes';
import Color from '../controllers/colors';

const router = Router()

// Récupérer tous les Workspaces de l'utilisateur
router.get('/', Workspace.list)

// Récupérer toutes les couleurs d'un Workspace
router.get('/:workspaceId/color',
  Workspace.populateOne,
  Color.listOwns,
)

// Récupérer tous les dégradés d'un Workspace
router.get('/:workspaceId/gradient',
  Gradient.listOwns
)

// Récupérer toutes les palettes d'un Workspace
router.get('/:workspaceId/palette',
  Palette.listOwns
)

// Créer un Workspace
router.post('/', Workspace.create)

// Modifier un Workspace
router.patch('/:workspaceId', Workspace.update)


// router.put('/:workspaceId/like',
//   Workspace.populateOne,
//   Workspace.likeItem
// )

// Like/unlike colors
router.patch('/:workspaceId/color/:colorId/like',
Workspace.populateOne,
Color.toggleLike
)

router.put('/:workspaceId/color',
  Workspace.populateOne,
  Color.addColor
)

// Like/unlike gradients
router.patch('/:workspaceId/gradient/:gradientId/like',
  Workspace.populateOne,
  Gradient.toggleLike
)

// Like/unlike palettes
router.patch('/:workspaceId/palette/:paletteId/like',
  Workspace.populateOne,
  Palette.toggleLike
)

router.delete('/:workspaceId/color/:colorId',
  Workspace.populateOne,
  Color.remove
)

// Supprimer un Workspace
router.delete('/:workspaceId', Workspace.remove)


/**
 * ✔ Récupérer tous les Workspaces de l'utilisateur
 * ✔ Récupérer toutes les couleurs d'un Workspace
 * ✔ Récupérer tous les dégradés d'un Workspace
 * ✔ Récupérer toutes les palettes d'un Workspace
 * ✔ Aimer une ressource d'un Workspace
 * ✔ Créer un Workspace
 * ✔ Modifier un Workspace
 * ✔ Supprimer un Workspace
 */

export default router