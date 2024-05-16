const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: { type: String, required: true},
    username: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true, default: 'user'},
})


const User = mongoose.model('users', userSchema)

module.exports = User