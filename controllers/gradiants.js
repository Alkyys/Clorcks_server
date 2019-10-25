const Gradient = require('./../models/Gradient')

exports.getAll = (req, res, next) => {
  Gradient.find().limit(50)
    .populate('stops.color', 'red blue green alpha name')
    .populate('user_id', 'name')
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

exports.get = (req, res, next) => {
  const id = req.params.GradientId
  Gradient.findById(id)
    .populate('stops.color', 'red blue green alpha name')
    .populate('user_id', 'name')
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

exports.post = (req, res, next) => {
  const Gradient = new Gradient({
    user_id: req.body.user_id,
    stops: req.body.stops,
    label: req.body.label,
  })
  Gradient.save().then(result => {
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

exports.patch = (req, res, next) => {
  const id = req.params.GradientId
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

exports.delete = (req, res, next) => {
  const id = req.params.GradientsId
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
