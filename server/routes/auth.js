const express = require('express')
const router = express.Router()

// controllers
const { register, login, currentUser } = require('../controllers/auth')

//middleware
const { auth, adminCheck } = require('../middleware/auth')

router.post('/register', register)

router.post('/login', login)

router.post("/current_user", auth, currentUser)

router.post("/current_admin", auth, adminCheck, currentUser)

module.exports = router