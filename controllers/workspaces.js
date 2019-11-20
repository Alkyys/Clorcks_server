import Workspace from './../models/WorkSpace'
import {validationResult} from 'express-validator'

export function getAll(req, res) {
  Workspace.find().limit(50)
    .populate('colors_id')
    .populate('user_id','name')
    .populate('colorsLike_id')
    .populate('palettesLike_id')
    .populate('gradientsLike_id')
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
  Workspace.findById(id)
    .populate('colors_id')
    .populate('user_id','name')
    .populate('colorsLike_id')
    .populate('palettesLike_id')
    .populate('gradientsLike_id')
    .exec()
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

export function post(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const workspace = new Workspace({
    user_id: req.body.user_id,
    name: req.body.name
  })
  workspace.save().then(result => {
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

export function patch(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.paletteId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Workspace.updateOne({
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
  Workspace.remove({
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
