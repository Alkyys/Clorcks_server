import Color from './../models/Color'
import { validationResult } from 'express-validator'

export function getAll (req, res, next) {
  Color.find().limit(50).exec()
    .then(docs => {
      if (docs.length >= 0) {
        res.status(200).json(docs)
      } else {
        res.status(404).json({
          message: 'Nous avons rien trouver ... '
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function get (req, res, next) {
  const id = req.params.colorId
  Color.findById(id).exec()
    .then(doc => {
      console.log(doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: `Nous n'avons rien trouve ... `
        })
      }

    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function post (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const color = new Color({
    red: req.body.red,
    blue: req.body.blue,
    green: req.body.green,
    alpha: req.body.alpha
  })
  color.save().then(result => {
    res.status(201).json({
      result
    })
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function patch (req, res, next) {
  const id = req.params.colorId // on prend notre color_id dans uri

    Color.findById(id).exec() // on va chercher le user_id de la couleur
    .then((result) => {
      if (!(result.user_id === req.userData)) { // on compare les deux
        res.status(401).json({
          err:"cette resource ne vous appartient pas"
        })
      }
      // TODO: demander a sacha si il manque pas quelque chose
    }).catch((err) => {
      res.status(404).json({ // la resource n'existe pas
        error: err
      })
    });
 


  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Color.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function remove (req, res, next) {
  const id = req.params.colorId

  Color.findById(id).exec() // on va chercher le user_id de la couleur
  .then((result) => {
    if (!(result.user_id === req.userData)) { // on compare les deux
      res.status(401).json({
        err:"cette resource ne vous appartient pas"
      })
    }
    // TODO: demander a sacha si il manque pas quelque chose
  }).catch((err) => {
    res.status(404).json({ // la resource n'existe pas
      error: err
    })
  });


  Color.remove({ _id: id }).exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}
