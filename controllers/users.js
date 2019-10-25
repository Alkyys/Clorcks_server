const User = require('./../models/User')

exports.getAll = (req, res, next) => {
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

exports.get = (req, res, next) => {
  const id = req.params.usersId
  User.findById(id).exec()
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

exports.postSignup = (req, res, next) => {
  const user = new User({
    _id: req.body.id,
    //name: req.body.name, TODO: probleme nom
    email: req.body.email
  })
  // user.save()
  auth
    .signup(req.body.email, req.body.password)
    .then(result => {
      user.save()
      res
        .status(201)
        .json({
          result
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.postLogin = (req, res, next) => {
  User.findOne({ email: 'alkyys@gmail.com' }).exec()
    .then(user => {
      console.log(user) // TODO: fix problem user vide
      if (!user.length) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      const token = jwt.sign({
        email: req.body.email,
        name: req.body.name
      }, process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }) // TODO: JWT refrech
      return res.status(200).json({
        message: "Auth successful",
        token: token,
        body: req.body
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.patch = (req, res, next) => {
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

exports.delete = (req, res, next) => {
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