const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {type: String, required: false},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    desc: {type: String, required: true},           //added desc
    type: {type: Number, required: true},           //added type    
    qty: {type: Number, required: true},            //added qty
    soldqty : {type: Number, required: false, default: 0},       //added soldqty
    sales: {type: Number, required: false, default: 0},         //added sales
})


const Product = mongoose.model('products', productSchema)

module.exports = Product
