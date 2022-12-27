import { Router } from 'express'
import { check } from 'express-validator'
import authController from './controllers/authController.js'
import roleMiddleware from './middleware/roleMiddleware.js'

const router = new Router()

router.post(
  '/registration',
  [
    check('username', 'Username must not be empty').notEmpty(),
    check('password', 'Password should have length 4-10 symbols').isLength({
      min: 4,
      max: 10,
    }),
  ],
  authController.registration
)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)

export default router
