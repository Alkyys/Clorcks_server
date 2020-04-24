import mongoose from 'mongoose'

import Palette from './../models/Palette'
import { validationResult } from 'express-validator'
import creatcolor from '../service/creatcolor';

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

function listOwns (req, res) {
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

async function populate (req, res) { }

async function toggleLike (req, res) {
  try {
    const { workspace } = req
    const paletteId = req.params.paletteId
    const result = await workspace.palettesLike_id.indexOf(paletteId)
    if (result === -1) {
      //on incremente likeCount de la palette
<<<<<<< Updated upstream
      const palette = await Palette.findById(item._id)
      console.log('🐛: toggleLike -> palette', palette)
      console.log('🐛: toggleLike -> palette.likeCount', palette.likeCount)
      palette.likeCount++
      console.log('🐛: ❤ toggleLike palette -> likeCount apres', likeCount)
=======
      const palette = await Palette.findById(paletteId)
      palette.likeCount++
      console.log('❤ ', palette.likeCount)
>>>>>>> Stashed changes
      await palette.save()
      // on rajoute l'id de la palette dans le workspace
      workspace.palettesLike_id.push(paletteId)
      await workspace.save()
      res.status(200).json({ liked: true })
    } else {
      //on decremente likeCount de la palette
      const palette = await Palette.findById(paletteId)
      palette.likeCount--
<<<<<<< Updated upstream
      console.log('🐛: 💔 toggleLike palette -> likeCount apres', likeCount)
=======
      console.log('💔 ', palette.likeCount)
>>>>>>> Stashed changes
      await palette.save()
      // on supp l'id de l'item
      workspace.palettesLike_id.splice(result, 1)
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
  console.log('🐛: post -> req.body', req.body)
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
    // tab des id des couleurs
    const ids = []
    const colors = []

    // boucle de creation des couleurs
    for (const item of req.body.colors_id) {
      const { color, error } = await creatcolor({
        red: item.red,
        green: item.green,
        blue: item.blue,
        alpha: 1
      })
      if (error) {
        res.status(500).json({
          error: error
        })
      }
      console.log('🐛: post -> color', color)
      ids.push(color._id)
      colors.push(color)
    }

    const palette = new Palette({
      colors_id: ids,
      label: req.body.label,
      workspace_id: req.body.workspace_id
    })
    console.log('🐛: post -> palette', palette)

    let result = await palette.save()
    result.colors_id = colors
    console.log('🐛: post -> result', result)
    res.status(201).json({
      result
    })
  } catch (error) {
    console.log('🐛: post -> error', error)
    return res.status(500).json({
      err: error
    })
  }
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

export default {
  listOwns,
  populate,
  toggleLike
}
