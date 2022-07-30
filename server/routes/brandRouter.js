const Router = require('express')
const BrandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()


router.post('/', checkRole('ADMIN'), BrandController.create)
router.get('/', BrandController.getAll)

module.exports = router