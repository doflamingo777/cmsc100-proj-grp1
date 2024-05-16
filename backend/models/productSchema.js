const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    desc: {type: String, required: true},           //added desc
    type: {type: Number, required: true},           //added type    
    qty: {type: String, required: true},            //added qty
    soldqty : {type: Number, required: true},       //added soldqty
})


const Product = mongoose.model('products', productSchema)

module.exports = Product
