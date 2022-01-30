const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/UITheater');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String
}, {
    collection: 'User',
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel