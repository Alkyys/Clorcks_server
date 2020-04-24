import { check } from 'express-validator'

export const validation = [
  check('user_id')
    .not().isEmpty().withMessage(`user_id manquant`)
    .isMongoId()
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)$/).withMessage(`ObjectId invalide`)
]