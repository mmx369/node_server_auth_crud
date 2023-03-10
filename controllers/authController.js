import bcrypt from 'bcryptjs'
import Role from '../models/Role.js'
import User from '../models/User.js'

import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, secret.secret, { expiresIn: '24h' })
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error: ', errors })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        res.status(400).json({ message: 'User already exists' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'USER' })
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      })
      await user.save()
      return res.json('User created')
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Registration error' })
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` })
      }
      const isValid = bcrypt.compareSync(password, user.password)
      if (!isValid) {
        return res.status(400).json({ message: `Passwords didn't much` })
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {}
  }
}

export default new AuthController()
