const Router = require('express')
const DeviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()


router.post('/', checkRole('ADMIN'), DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

module.exports = router