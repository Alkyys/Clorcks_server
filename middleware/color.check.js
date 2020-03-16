import { check } from 'express-validator'

export const validation = [
  check("red")
    .not().isEmpty().withMessage(`red manquant`)
    .matches(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/).withMessage(`couleur rouge invalide`),
  check('blue')
    .not().isEmpty().withMessage(`blue manquant`)
    .matches(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/).withMessage(`couleur bleu invalide`),
  check('green')
    .not().isEmpty().withMessage(`green manquant`)
    .matches(/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/).withMessage(`couleur vert invalide`),
  check('alpha')
    .not().isEmpty().withMessage(`alpha manquant`)
    .matches(/^(0.[0-9]{1,2}|0|1)$/).withMessage(`couleur alpha invalide`)
]
