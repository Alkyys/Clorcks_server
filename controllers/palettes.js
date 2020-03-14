import Palette from './../models/Palette'
import { validationResult } from 'express-validator'

export function getAll (req, res) {
  Palette.find().limit(50)
    .populate('colors_id')
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
  const id = req.params.paletteId
  Palette.findById(id)
    .populate('colors_id')
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
  Palette.find({ 'workspace_id': `${id}` })
    .populate('colors_id')
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

export function post (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const palette = new Palette({
    user_id: req.body.user_id,
    label: req.body.label,
    colors_id: req.body.colors_id,
    workspace_id: req.body.workspace_id
  })
  palette.save().then(result => {
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

export async function patch (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // on prend notre palette_id dans uri
  const id = req.params.paletteId

  const palette = await Palette.findById(id) // verif si la res existe 

  if (palette === {}) { // on verif si on a recu quelque chose
    return res.status(404).json({
      err: "ressource indisponible"
    })
  }

  Object.assign(palette, req.body)

  // Si le palette n'a pas été modifié, la renvoyer
  if (!palette.isModified()) {
    return res.status(203).json(palette)
  }

  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Palette.updateOne({
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
  const id = req.params.paletteId
  Palette.remove({
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
