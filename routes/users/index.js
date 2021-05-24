const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../helpers/guard')
const rateLimit = require("express-rate-limit")
const uploadAvatar = require('../../helpers/upload-avatar')

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2, 
    handler: (req, res, next) => {
      return res.status(429).json({
        status: "error",
        code: 429,
        message: "Too Many Requests",
      })
    }
  });

router.patch('/', guard, ctrl.updateUserStatus)

router.post('/signup', limiter, ctrl.signup) 

router.post('/login', ctrl.login) 

router.post('/logout', guard, ctrl.logout) 

router.post('/current', guard, ctrl.current)

router.patch('/avatars', guard, uploadAvatar.single('avatar'), ctrl.updateAvatar)

module.exports = router
