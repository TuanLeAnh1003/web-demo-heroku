const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/UITheater', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

// const account = new Schema({
//   username: String,
//   password: String
// }, {
//     collection: 'Account'
// });

// const AccountModel = mongoose.model('account', account);

// // Tìm kiếm trong DB
// AccountModel.find({})
// .then( data => {
//     console.log('Data: ', data);
// } )
// .catch( err => {
//     console.log('Lỗi: ', err);
// })

// Thêm vào DB
// AccountModel.create({
//     username: 'thanh',
//     password: 'password1'
// }).then( data => {
//     console.log(data);
// })
// .catch( err => {
//     console.log('Lỗiii');
// })

const UserSchema = new Schema({
    username: String,
    password: String,
    age: Number,
    cardId: {
        type: String,
        ref: 'card'
    }
}, {
    collection: 'User'
})

const CardSchema = new Schema({
    cardId: String,
    cardNumber: Number,
    salary: Number
}, {
    collection: 'Card'
})

const UserModel = mongoose.model('user', UserSchema)
const CardModel = mongoose.model('card', CardSchema)

UserModel.find({
    username: 'tuan'
})
.populate('cardId')
.then( (data) => {
    console.log(data);
})
.catch( err => {
    console.log(err);
})

// CardModel.find()
// .then( (data) => {
//     console.log(data);
// })
// .catch( err => {
//     console.log(err);
// })
