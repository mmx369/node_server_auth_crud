import { Router } from 'express'
import PostsController from './controllers/postsController.js'
import UserController from './controllers/userController.js'
import PostController from './PostController.js'

const router = new Router()

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)

router.post('/user', UserController.createUser)
router.get('/user', UserController.getUsers)
router.get('/user/:id', UserController.getOneUser)
router.put('/user', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

router.post('/post', PostsController.createPost)
router.get('/post', PostsController.getPostByUser)

export default router
