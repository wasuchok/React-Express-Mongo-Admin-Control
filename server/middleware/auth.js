const { request } = require('express')
const jwt = require('jsonwebtoken')

exports.auth  = async (req, res, next) => {
    try {
        const token = req.headers["authtoken"]

        if(!token) {
            return res.status(401).send("no token , authorization denied")
        }

        const decoded = jwt.verify(token, process.env.JWT)

        // console.log('middleware', decoded)

        req.user = decoded.user

        next()

    } catch (err) {
        console.log(err)
        res.status(401).send('Token Invalid!!')
    }
}

exports.adminCheck = async (req, res, next) => {
    try {

        const { username } = req.user

        const adminUser = await User.findOne({ username : username}).exec()

        if(adminUser.role !== 'admin') {
            res.status(403).send('Admin Access Denied')
        } else {
            next()
        }

    } catch(err) {
        console.log(err)
        res.status(401).send('Admin Access Denied')
    }
}