import Palette from './../models/Palette'
import {validationResult} from 'express-validator'

export function getAll(req, res) {
  Palette.find().limit(50)
    .populate('colors_id')
    .populate('user_id','name')
    .populate('workspace_id', 'name')
    .exec()
    .then(docs => {
      console.log(docs)
      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function get(req, res) {
  const id = req.params.paletteId
  Palette.findById(id)
    .populate('colors_id')
    .populate('user_id','name')
    .populate('workspace_id', 'name')
    .exec()
    .then(doc => {
      console.log(doc)
      if (doc) {
        res.status(200).json(doc)
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

export function post(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const palette = new Palette({
    user_id: req.body.user_id,
    label: req.body.label,
    colors_id: req.body.colors_id,
    workspace_id:req.body.workspace_id
  })
  console.log(palette)
  palette.save().then(result => {
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

export function patch(req, res) {
  const id = req.params.paletteId
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
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function remove(req, res) {
  const id = req.params.paletteId
  Palette.remove({
      _id: id
    }).exec()
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
