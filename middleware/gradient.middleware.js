import { check } from 'express-validator'

export const validation = [
  check('user_id')
    .isEmpty().withMessage(`ObjectId manquant`)
    .isMongoId()
    .matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)$/).withMessage(`ObjectId invalide`),
  check('stops')
    .isEmpty().withMessage(`Stops Manquant`)
    .matches(/^\[((\{"color":"([a-f0-9)]{24})","position":"([0-9]{1}|[0-9]{2}|100)"\})(|,)){2,24}\]$/).withMessage(`couleur bleu invalide`),
  check('label')
    .isEmpty().withMessage(`c'est vide`)
    .matches(/^([A-Za-z0-9 '-]{3,25})$/).withMessage(`couleur alpha invalide`)
]
