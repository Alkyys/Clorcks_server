import Color from './../models/Color'
import Workspace from '../models/WorkSpace'
import { validationResult } from 'express-validator'
import creatcolor from '../service/creatcolor';

export async function getAll (req, res) {
  try {
    const colors = await Color.find()
    return res.json(colors)
  } catch (error) {
    console.log('🐛: getAll -> error', error)
    return res.sendStatus(500)
  }
}

async function listOwns (req, res) {
  try {
    const { workspace } = req
    const result = await Workspace
      .findById(workspace._id)
      .populate('colors_id')
    res.status(201).json(
      result.colors_id
    )
  } catch (error) {
    res.status(500).json({
      err: error
    })
  }
}

async function populate (req, res) { }

async function toggleLike (req, res) {
  try {
    // on recupere id de worksapce 
    const { workspace } = req
    const colorId = req.params.colorId
    const result = await workspace.colorsLike_id.indexOf(colorId)

    if (result === -1) {
      // on incremente likeCount de la couleur
      const color = await Color.findById(colorId)
      color.likeCount++
      console.log(' ❤ ', color.likeCount)
      await color.save()
      // on rajoute l'id de item
      workspace.colorsLike_id.push(colorId)
      await workspace.save()
      // valeur de retour
      res.status(200).json({ liked: true })
    } else {
      // on supp l'id de l'item
      const color = await Color.findById(colorId)
      color.likeCount--
      console.log('🐛: 💔', color.likeCount)
      await color.save()
      workspace.colorsLike_id.splice(result, 1)
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

  try {
    const { color, error } = await creatcolor({
      red: req.body.red,
      blue: req.body.blue,
      green: req.body.green,
      alpha: req.body.alpha
    })
    if (error) {
      res.status(500).json({
        err: error
      })
    }
    res.status(201).json({
      color
    })
  } catch (error) {
    console.log('🐛: post -> error', error)
    res.status(500).json({
      err: error
    })
  }
}

async function addColor (req, res) {
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

export async function patch (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const id = req.params.colorId // on prend notre color_id dans uri

  const color = await Color.findById(id)

  Object.assign(color, req.body)

  // Si la couleur n'a pas été modifié, la renvoyer
  if (!color.isModified()) {
    return res.status(203).json(color)
  }

  // Cherche si les nouvelles valeurs correspondent déjà à une couleur existante
  const { red, blue, green, alpha } = color
  const search = await Color.findOne({ red, blue, green, alpha })
  if (search) {
    // Renvoi la couleur qui existe déjà
    return res.status(201).json(search)
  }

  // Créer la couleur et la renvoi
  const newColor = await Color.create({ red, blue, green, alpha })
  return res.status(201).json(newColor)
}

export function remove (req, res) {
  const id = req.params.colorId

  Color.findById(id).exec() // on va chercher le user_id de la couleur
    .then((result) => {
      if (!(result.user_id === req.userData)) { // on compare les deux
        res.status(401).json({
          err: "cette resource ne vous appartient pas"
        })
      }
    }).catch((err) => {
      // la resource n'existe pas
      res.status(404).json({
        error: err
      })
    });


  Color.remove({ _id: id }).exec()
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
  toggleLike,
  remove,
  addColor
}
