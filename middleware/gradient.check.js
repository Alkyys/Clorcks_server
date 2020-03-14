import { check } from 'express-validator'

export const validation = [
  check('stops')
    .not().isEmpty().withMessage(`Stops manquant`)
    // .matches(/^\[((\{"color":"([a-f0-9)]{24})","position":"([0-9]{1}|[0-9]{2}|100)"\})(|,)){2,5}\]$/).withMessage(`Stops invalide`)
    ,
  check('label')
    .not().isEmpty().withMessage(`label manquant`)
    .matches(/^([A-Za-z0-9 '-]{3,25})$/).withMessage(`label invalide`)
]
