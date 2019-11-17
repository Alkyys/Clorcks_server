export default (req, res, next) => {
  try {
    // recuperation du token en base64
    const token = req.headers.authorization.split(" ")[1]
    // on le decode et on garde que le payload du quel on extrait user_id
    const { user_id } = atob(token)[1] 
    // on met notre user_id dans la req pour le prochain middleware
    req.userData = user_id
    // aller la suite ...
    next()
  } catch (error) {
    // le token est pas en base64 ou il n'y a pas de user_id
    return res.status(500).json({
      err: " False User"
    })
  }
}