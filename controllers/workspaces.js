import mongoose from 'mongoose'

import Workspace from './../models/WorkSpace'
import Palette from './../models/Palette'
import Gradient from '../models/Gradient'
import { validationResult } from 'express-validator'

export async function poplateOne (req, res, next) {
  const { workspaceId } = req.params
  if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
    return res.status(400).json({
      error: 'ObjectId Invalid'
    })
  }
  try {
    const workspace = await Workspace.findOne({
      _id: workspaceId,
      user_id: req.userData.user_id
    })
    if (!workspace) {
      return res.sendStatus(404)
    }
    Object.assign(req, { workspace })
    console.log(`✅ poplateOn `);
    next()
  } catch (error) {
    return res.status(401).json({
      err: error
    })
  }
}

export function getAll (req, res) {
  Workspace.find({ user_id: req.userData.user_id })
    .populate('colors_id')
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

export function getMy (req, res) {
  const id = req.params.userId
  Workspace.find({ "user_id": `${id}` })
    .populate('colors_id')
    .populate({
      path: 'palettes_id',
      populate: { path: 'colors_id' }
    })
    .populate({
      path: 'gradients_id',
      populate: { path: 'stops.color' }
    })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: `Nous n'avons rien trouve ... `
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export function getMyGradient (req, res) {
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

export function getMyPalette (req, res) {
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
  const workspace = new Workspace({
    user_id: req.userData.user_id,
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

export function patch (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.workspaceId
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
      res.status(500).json({
        error: err
      })
    })
}

export async function addColor (req, res) {
  console.log('🐛: push -> req.workspace._id', req.workspace._id)
  console.log('🐛: push -> req.body._id', req.body._id)
  try {
    const { workspace } = req
    workspace.colors_id.push(req.body._id)
    await workspace.save()
    res.status(201).json(workspace)
  } catch (error) {
    console.log('🐛: push -> error', error)
    res.status(500).json({
      error: error
    })
  }
}

export function remove (req, res) {
  const id = req.params.workspaceId
  Workspace.remove({
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
