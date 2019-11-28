import Gradient from '../models/Gradient'
import {validationResult} from 'express-validator'

export function getAll(req, res) {
  Gradient.find().limit(50)
    .populate('stops.color', 'red blue green alpha name')
    .populate('user_id', 'name')
    .populate('workspace_id', 'name')
    .exec()
    .then(docs => {
      res.status(200).json(docs)
    })
    .catch(err => {

      res.status(500).json({
        error: err
      })
    })
}

export function get(req, res) {
  const id = req.params.gradientId
  Gradient.findById(id)
    .populate('stops.color', 'red blue green alpha name')
    .populate('user_id', 'name')
    .populate('workspace_id', 'name')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: 'Nous avons rien trouver ... '
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export function post(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const gradient = new Gradient({
    user_id: req.body.user_id,
    stops: req.body.stops,
    label: req.body.label,
    workspace_id: req.body.workspace_id
  })
  gradient.save().then(result => {
    res.status(201).json({
      result
    })
  })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export async function patch(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.gradientId // on prend notre gradient_id dans uri

  const gradient = await Gradient.findById(id) // verif si la res existe 

  if (gradient === {}) { // on verif si on a recu quelque chose
    return res.status(404).json({
      err:"ressource indisponible"
    })
  }

  Object.assign(gradient, req.body)

  // Si le degrader n'a pas été modifié, le renvoyer
  if (!gradient.isModified()) {
    return res.status(203).json(gradient)
  }

  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Gradient.updateOne({
    _id: id
  }, {
    $set: updateOps
  })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export function remove(req, res) {
  const id = req.params.gradientsId
  Gradient.remove({
    _id: id
  }).exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
