const express = require('express')
const app = express()
const port = 5000
const path = require('path')
var bodyParser = require('body-parser')
const UserModel = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//register
app.get('/register', (req, res, next) => {
  res.json('register')
})
app.post('/register', (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  UserModel.findOne({ 
    username: username
  })
  .then (data => {
    if (data) {
      res.json('Tai khoan nay da ton tai!!!')
    } else {
      return UserModel.create({
        username: username,
        password: password
      })
    }
  })
  .then(data => {
    res.json('Tao tai khoan thanh cong!!!')
  })
  .catch(err => {
    res.status(500).json('Co loi!!!')
  })
})

//login user
app.post('/login', (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  
  UserModel.findOne({
    username: username,
    password: password
  })
  .then(data => {
    if (data) {
      res.json('dang nhap thanh cong!!!')
    } else {
      res.status(400).json('Username hoac password khong ton tai!!!')
    }
  })
  .catch(err => {
    res.status(500).json('co loi ben server')
  })
})

// Router
var userRouter = require('./routers/user')

app.use('/api/user/', userRouter)

// Home
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res, next) => {
  var linkFile = path.join(__dirname, 'home.html')
  res.sendFile(linkFile);
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})