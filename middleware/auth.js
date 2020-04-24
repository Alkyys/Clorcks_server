import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = decoded
    console.log(`👌 Auth valide`);
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    })
  }
}