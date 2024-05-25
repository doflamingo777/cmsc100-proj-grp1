const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productId: { type: String, ref: 'oncarts', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: {type: Number, required: true},
});

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: { type: String, required: true},
    username: {type: String, required: true, unique: true},
    middlename:{type: String, required: false},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userType: {type: String, required: true, default: 'user'},
    shopping_cart: { type: [cartItemSchema], default: [] },
})


const User = mongoose.model('users', userSchema)

module.exports = User