import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export default function (roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'User not authorized' })
      }
      const { roles: userRoles } = jwt.verify(token, secret.secret)
      let hasRole
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: `Access denied` })
      }

      next()
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'User not authorized' })
    }
  }
}
