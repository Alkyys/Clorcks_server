import { check } from 'express-validator'

export const validation = [
  check('user_id')
    .isEmpty().withMessage(`user_id manquant`)
    .isMongoId()
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)$/).withMessage(`ObjectId invalide`),
  check('color_id')
    .isEmpty().withMessage(`color_id manquant`)
    .matches(/^\[("([a-f\d]{24})"(|,)){2,5}\]$/).withMessage(`couleur invalide`),
  check('label')
    .isEmpty().withMessage(`label manquant`)
    .matches(/^([A-Za-z0-9 '-]{3,25})$/).withMessage(`label invalide`)
]