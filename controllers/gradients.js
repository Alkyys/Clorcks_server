import mongoose from 'mongoose'

import Gradient from '../models/Gradient'
import { validationResult } from 'express-validator'
import creatcolor from '../service/creatcolor';

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

function listOwns (req, res) {
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

async function populate (req, res) {}

async function toggleLike (req, res) {


  const { workspace } = req
  const gradientId = req.params.gradientId
  try {
    const result = await workspace.gradientsLike_id.indexOf(gradientId)
    if (result === -1) {
      //on incremente likeCount de la gradient
      const gradient = await Gradient.findById(gradientId)
      gradient.likeCount++
      console.log('❤ ', gradient.likeCount)
      await gradient.save()
      // on rajoute l'id de la gradient dans le workspace
      workspace.gradientsLike_id.push(gradientId)
      await workspace.save()
      res.status(200).json({ liked: true })
    } else {
      //on decremente likeCount de la gradient
      const gradient = await Gradient.findById(gradientId)
      gradient.likeCount--
      console.log('💔', gradient.likeCount)
      await gradient.save()
      // on supp l'id de l'item
      workspace.gradientsLike_id.splice(result, 1)
      await workspace.save()
      res.status(200).json({ liked: false })
    }
  } catch (error) {
    console.log('🐛: push -> error', error)
    res.status(500).json({
      error: error
    })
  }

}

export async function post (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.workspace_id)) {
    return res.status(400).json({
      error: 'ObjectId Invalid'
    })
  }

  try {
    // creation de la couleur 1 
    const { color: color1, error1 } = await creatcolor({
      red: req.body.stops[0].color.red,
      green: req.body.stops[0].color.green,
      blue: req.body.stops[0].color.blue,
      alpha: 1
    })

    // creation de la couleur 2 
    const { color: color2, error2 } = await creatcolor({
      red: req.body.stops[1].color.red,
      green: req.body.stops[1].color.green,
      blue: req.body.stops[1].color.blue,
      alpha: 1
    })

    if (error1 || error2) {
      res.status(500).json({
        error: error1 || error2
      })
    }

    // creation du gradinet 
    const gradient = new Gradient({
      user_id: req.body.user_id,
      stops: [
        {
          color: color1._id,
          position: 0
        }, {
          color: color2._id,
          position: 100
        }
      ],
      label: req.body.label,
      workspace_id: req.body.workspace_id
    })

    let result = await gradient.save()
    // remplacer les _id en couleur rgb 
    result.stops[0].color = color1
    result.stops[1].color = color2

    console.log(`☑ Gradient Creted !`);
    
    res.status(201).json({
      result
    })
  } catch (error) {
    console.log('🐛: post gradient.js -> error', error)
    res.status(500).json({
      err: error
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
  const id = req.params.gradientId
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

export default {
  listOwns,
  populate,
  toggleLike
}