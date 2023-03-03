const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.listUsers = async (req, res) => {
    try {
        const user = await User.find().select("-password").exec()
        res.status(200).json({
            status : 'ok',
            message : 'สำเร็จ',
            data : user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}

exports.readUsers = async (req, res) => {
    try {
        const user = await User.findOne({"_id" : req.params.id}).select("-password").exec()
        res.status(200).json({
            status : 'ok',
            message : 'สำเร็จ',
            data : user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}

exports.updateUsers = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)

        let newPassword = await bcrypt.hash(req.body.password, salt)

        const user = await User.findOneAndUpdate({"_id" : req.params.id}, {"password" : newPassword}).exec()

        res.status(200).json({
            status : 'ok',
            message : 'สำเร็จ',
            data : user
        })

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}

exports.removeUsers = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({"_id" : req.params.id}).exec()
        res.status(200).json({
            status : 'ok',
            message : 'สำเร็จ',
            data : user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}

exports.changeEnabled = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({"_id" : req.body.id}, {"enabled" : req.body.enabled}).exec()
        res.status(200).json({
            status : 'ok',
            message : 'สำเร็จ',
            data : user
        })

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}

exports.changeRole = async (req, res) => {
    try {

        const user = await User.findOneAndUpdate({"_id" : req.body.id}, {"role" : req.body.role}).exec()
        res.status(200).json({
            status : 'ok',
            message : 'สำเร็จ',
            data : user
        })

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error !')
    }
}