import Gradient from '../models/Gradient'
import Color from '../models/Color'
import { validationResult } from 'express-validator'

export function getAll (req, res) {
  Gradient.find().limit()
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

export function get (req, res) {
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

export function getMy (req, res) {
  const id = req.params.workspaceId
  Gradient.find({ 'workspace_id': `${id}` })
    .populate('stops.color', 'red blue green alpha name')
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

export async function post (req, res) {
  console.log('🐛: post -> req.body', req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  try {
    // creation de la couleur 1 
    const color1 = new Color({
      red: req.body.stops[0].color.red,
      green: req.body.stops[0].color.green,
      blue: req.body.stops[0].color.blue,
      alpha: 1
    })
  
    // creation de la couleur 2 
    const color2 = new Color({
      red: req.body.stops[1].color.red,
      green: req.body.stops[1].color.green,
      blue: req.body.stops[1].color.blue,
      alpha: 1
    })
    // color -> bd
    const result1 = await color1.save()
    console.log('🐛: post -> result1', result1)
    const result2 = await color2.save()
    console.log('🐛: post -> result2', result2)

    // creation du gradinet 
    const penis = new Gradient({
      user_id: req.body.user_id,
      stops: [
        {
          color: result1._id,
          position: 0
        }, {
          color: result2._id,
          position: 100
        }
      ],
      label: req.body.label,
      workspace_id: req.body.workspace_id
    })
    console.log('🐛: post -> gradient', penis)

    const result = await penis.save()
    console.log('🐛: post -> result', result)
    res.status(201).json({
      result
    })
  } catch (error) {
    console.log('🐛: post -> error', error)
    res.status(500).json({
      error: error
    })
  }
}

export async function patch (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.gradientId // on prend notre gradient_id dans uri

  const gradient = await Gradient.findById(id) // verif si la res existe 

  if (gradient === {}) { // on verif si on a recu quelque chose
    return res.status(404).json({
      err: "ressource indisponible"
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

export function remove (req, res) {
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
