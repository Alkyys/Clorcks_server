import User from './../models/User'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Workspace from './../models/WorkSpace'

export function getAll (req, res) {
  User.find().limit(200).exec()
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
  const id = req.params.usersId
  User.findById(id).exec()
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

export function signup (req, res) {
  User.findOne({ email: req.body.email }).exec()
    .then(user => {
      if (user) { // on regardde si on a recu quelque chose de la bd
        return res.status(409).json({
          message: "mail existant"
        })
      } else {

        // on cree le mot de passe encrypted
        let cipher = crypto.createCipheriv('aes-256-cbc', process.env.KEY_CRYPTO, process.env.IV);
        let encrypted = cipher.update(req.body.password, 'utf-8', 'hex');
        encrypted += cipher.final('hex');

        // on cree notre user
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: encrypted
        })

        user.save()
          .then(result => {
            // on cree notre premier workspace avec le _id qu'on a recu 
            // on le nommera main
            const workspace = new Workspace({
              user_id: result._id,
              name: "main"
            })
            try {
              workspace.save()
            } catch (err) {
              res.status(500).json({
                error: err
              })
            }
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
    })
}

export function login (req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) { // mail inexistant
        return res.status(404).json({
          message: 'Auth failed'
        })
      }

      let decipher = crypto.createDecipheriv('aes-256-cbc', process.env.KEY_CRYPTO, process.env.IV);
      let decrypted = decipher.update(user.password, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');

      if (req.body.password === decrypted) {

        const token = jwt.sign({
          email: user.email,
          user_id: user._id,
          name: user.name
        }, process.env.JWT_SECRET, {
          expiresIn: "1h"
        })

// TODO: on envoi le workpace de l'utilisateur

        return res.status(200).json({
          message: "Auth successful",
          token: token
        })
      } else {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
    }).catch(err => {
      res.status(401).json({
        message: "Auth faild",
        error: err
      })
    })
}

export function patch (req, res) {
  const id = req.params.userId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  User.updateOne({
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

export function del (req, res) {
  const id = req.params.usersId
  User.remove({
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