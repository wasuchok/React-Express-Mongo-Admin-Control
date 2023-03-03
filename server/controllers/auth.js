const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        // Check User

        const { username, password } = req.body
        let user = await User.findOne({ username })
        if (user) {
            return res.status(200).send("มีผู้ใช้งานแล้ว")
        }

        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password
        })

        // Encrypt Password

        user.password = await bcrypt.hash(password, salt)

        await user.save()

        res.send("สมัครสมาชิกสำเร็จ")


    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        let user = await User.findOneAndUpdate({ username }, { new: true })
        if (user && user.enabled) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Password Invalid!!')
            }

            const payload = {
                user: {
                    username: user.username,
                    role: user.role
                }
            }

            jwt.sign(payload, process.env.JWT, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.status(200).json({
                    status: "ok",
                    message: "สำเร็จ",
                    token: token,
                    data: payload
                })
            })

        } else {
            return res.status(400).send("User Not Found!!!")
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error !')
    }
}

exports.currentUser = async (req, res) => {
    try {
        // console.log(req.user)
        const user = await User.findOne({ username : req.user.username})
        .select('-password')
        .exec()
        res.status(200).json({
            status : "ok",
            message : "สำเร็จ",
            data : user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}

