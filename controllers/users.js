import User from './../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export function getAll (req, res, next) {
  User.find().limit(200).exec()
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

export function get (req, res, next) {
  const id = req.params.usersId
  User.findById(id).exec()
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

export function signup (req, res, next) {
  User.find({ email: req.body.email }).exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "mail existant"
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash
            })
            user.save()
              .then(result => {
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
    })

}

export function login (req, res, next) {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id,
            name: user[0].name
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          })
          return res.status(200).json({
            message: "Auth successful",
            token: token
          })
        } else {
          return res.status(404).json({
            message: 'Auth failed'
          })
        }
      })

    }).catch(err => {
      res.status(401).json({
        message: "Auth faild",
        error: err
      })
    })
}

export function patch (req, res, next) {
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
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function del (req, res, next) {
  const id = req.params.usersId
  User.remove({
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