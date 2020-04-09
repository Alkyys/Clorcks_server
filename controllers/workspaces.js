import mongoose from 'mongoose'

import Workspace from './../models/WorkSpace'
import Color from './../models/Color'
import { validationResult } from 'express-validator'

async function populateOne (req, res, next) {
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
    console.log('🐛: populateOne -> workspace._id', workspace._id)
    if (!workspace) {
      return res.sendStatus(404)
    }
    await Object.assign(req, { workspace })
    console.log(`✅ populate Workspace `);
    next()
  } catch (error) {
    return res.status(401).json({
      err: error
    })
  }
}

async function list (req, res) {
  try {
    const result = await Workspace.find({ user_id: req.userData.user_id })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      err: error
    })
  }
}

function create (req, res) {
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

function update (req, res) {
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

async function removeColor (req, res) {
  try {
    if (req.params.colorId === undefined) {
      res.status(500).json({
        error: "colorId === undefined"
      })
    }
    const { workspace } = req
    const colorId = req.params.colorId
    console.log(`update( { _id: ${workspace._id} }, { $pull: { colors_id: ${colorId} } } )`);
    workspace.update({ _id: workspace._id }, { $pull: { colors_id: colorId } })
    await workspace.save()
    await Color.deleteOne({ _id: colorId })
    res.status(201).json(workspace)
  } catch (error) {
    res.status(500).json({
      err: error
    })
  }
}

function remove (req, res) {
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

export default {
  populateOne,
  list,
  create,
  update,
  removeColor,
  remove
}