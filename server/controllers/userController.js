const ApiError = require('../error/ApiError')

class UserController {

    async registration(req, res) {

    }

    async login(req, res) {
        
    }

    async checkAuth(req, res, next) {
        const {id} = req.query
        if (!id) {
            next(ApiError.badRequest('ID not specified'))
        }
        res.json(id)
    }
}

module.exports = new UserController()