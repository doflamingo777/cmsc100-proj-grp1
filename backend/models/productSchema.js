const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {type: Number, required: false},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    desc: {type: String, required: true},           //added desc
    type: {type: Number, required: true},           //added type    
    qty: {type: Number, required: true},            //added qty
    soldqty : {type: Number, required: true, default: 0},       //added soldqty
})


const Product = mongoose.model('products', productSchema)

module.exports = Product
