import Gradient from '../models/Gradient'

export function getAll(req, res, next) {
  Gradient.find().limit(50)
    .populate('stops.color', 'red blue green alpha name')
    .populate('user_id', 'name')
    .populate('workspace_id', 'name')
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

export function get(req, res, next) {
  const id = req.params.gradientId
  Gradient.findById(id)
    .populate('stops.color', 'red blue green alpha name')
    .populate('user_id', 'name')
    .populate('workspace_id', 'name')
    .exec()
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

export function post(req, res, next) {
  const gradient = new Gradient({
    user_id: req.body.user_id,
    stops: req.body.stops,
    label: req.body.label,
    workspace_id: req.body.workspace_id
  })
  gradient.save().then(result => {
    res.status(201).json({
      result
    })
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function patch(req, res, next) {
  const id = req.params.gradientId
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
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

export function remove(req, res, next) {
  const id = req.params.gradientsId
  Gradient.remove({
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
