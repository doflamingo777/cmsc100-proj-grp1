const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'oncarts', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: { type: String, required: true},
    username: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true, default: 'user'},
    shopping_cart: { type: [cartItemSchema], default: [] },
})


const User = mongoose.model('users', userSchema)

module.exports = User