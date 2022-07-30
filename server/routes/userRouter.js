const Router = require('express')
const UserController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

const router = new Router()


router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', AuthMiddleware, UserController.checkAuth)

module.exports = router