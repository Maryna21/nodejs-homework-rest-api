const {HttpCode} = require('./constants')
require('../config/passport')

const status = (status) => (req, res, next) => {
    const statusUser = req.user.subscription
    if(statusUser !== status){
        return res.status(HttpCode.FORBIDEN).json({
            status: 'error',
            code: HttpCode.FORBIDEN,
            message: 'Access is denied'
        })
    }
    return next()
    }

module.exports = status