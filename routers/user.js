const express = require('express')
var router = express.Router()
const UserModel = require('../models/user')

// Lấy dữ liệu từ db
router.get('/', (req, res, next) => {
    UserModel.find()
    .then (data => {
        res.json(data)
    })
    .catch (err => {
        res.status(500).json('Loi server!!!')
    })
})

// Get by _id
router.get('/:id', (req, res, next) => {
    var id = req.params.id

    UserModel.find({
        _id: id
    })
    .then (data => {
        res.json(data)
    })
    .catch (err => {
        res.status(500).json('Loi server!!!')
    })
})

// Thêm mới dữ liệu vào db
router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    console.log(username, password);

    UserModel.findOne({ 
        username: username, 
        password: password
    })
    .then (data => {
        if (data) {
            res.status(400).json('Tai khoan da ton tai!!!')
        } else {
            return UserModel.create({
                username: username,
                password: password
            })
            
        }
    })
    .then(data => {
        res.json('Them moi thanh cong')
    })
    .catch(err => {
        res.status(500).json('Loi server!!!')
    })
})

// Cập nhật dữ liệu trong db
router.put('/:id', (req, res, next) => {
    var id = req.params.id
    var newPassword = req.body.newPassword

    UserModel.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then (data => {
        res.json('update thanh cong')
    })
    .catch (err => {
        res.status(500).json('Loi server!!')
    })
})

// Xóa dữ liệu trong db
router.delete('/:id', (req, res, next) => {
    var id = req.params.id

    UserModel.deleteOne({
        _id: id
    })
    .then (data => {
        res.json('Xoa thanh cong')
    })
    .catch (err => {
        res.status(500).json('Loi server')
    })
})


module.exports = router