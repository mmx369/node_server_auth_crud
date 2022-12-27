import { Router } from 'express'
import userAuthController from '../controllers/user-controller.js'

const router = new Router()

router.post('/registration', userAuthController.registration)
router.post('/login', userAuthController.login)
router.post('/logout', userAuthController.logout)

router.get('/activate/:link', userAuthController.activate)
router.get('/refresh', userAuthController.refresh)
router.get('/myusers', userAuthController.getUsers)

export default router
