import User, { find, findById, updateOne, remove } from './../models/User'
import auth from './../middleware/auth.js'

export function getAll(req, res, next) {
  find().limit(200).exec()
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

export function get(req, res, next) {
  const id = req.params.usersId
  findById(id).exec()
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

export function signup(req, res, next) {
  const user = new User({
    _id: req.body.id,
    //name: req.body.name, TODO: probleme nom
    email: req.body.email
  })
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

export function login(req, res, next) {
  auth
    .login(req.body.email, req.body.password)
    .then(result => {
      return res.status(200).json({
        message: "Auth successful",
        response: result
      })
    }).catch(err => {
      res.status(401).json({
        message: "Auth faild",
        error: err
      })
    })
}

export function logout(req, res, next) {
  const user = auth.currentUser();
  user
    .logout()
    .then(result => {
      res.status(200).json({
        message: `Lougout successful`,
        response: result
      })
    })
    .catch(err => {
      res.status(401).json({
        message: "Logout faild",
        error: err
      })
    })
}

export function recoverypsw(req, res, next) {
  auth
    .requestPasswordRecovery(req.body.email)
    .then(response => {
      return res.status(200).json({
        message: "recovery successful",
        response: response
      })
    }).catch(err => {
      res.status(401).json({
        message: "recovery faild",
        error: err
      })
    })
}

export function patch(req, res, next) {
  const id = req.params.userId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  updateOne({
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

export function del(req, res, next) {
  const id = req.params.usersId
  remove({
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