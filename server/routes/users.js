const express = require('express')
const router = express.Router()

// controllers
const { listUsers, readUsers, updateUsers, removeUsers, changeEnabled, changeRole } = require('../controllers/users')

//middleware
const { auth, adminCheck } = require('../middleware/auth')

router.get('/users', auth, adminCheck, listUsers)

router.get('/users/:id', readUsers)

router.put('/users/:id', auth, adminCheck, updateUsers)

router.delete('/users/:id',auth, adminCheck, removeUsers)

router.post(`/change_enabled`, auth, adminCheck, changeEnabled)

router.post(`/change_role`, auth, adminCheck, changeRole)


module.exports = router