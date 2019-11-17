import { check } from 'express-validator'

export const validation = [
  check('red')
    .isEmpty().withMessage(`red manquant`)
    .matches(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/).withMessage(`couleur rouge invalide`),
  check('bleu')
    .isEmpty().withMessage(`blue manquant`)
    .matches(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/).withMessage(`couleur bleu invalide`),
  check('green')
    .isEmpty().withMessage(`green manquant`)
    .matches(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/).withMessage(`couleur vert invalide`),
  check('alpha')
    .isEmpty().withMessage(`alpha manquant`)
    .matches(/^([0-1]\.0|0\.[0-9]{1,2})\)$/).withMessage(`couleur alpha invalide`),
  check('name')
    .isEmpty().withMessage(`name manquant`)
    .matches(/^([A-Za-z0-9 '-]{3,25})$/).withMessage(`name invalide`),
]
