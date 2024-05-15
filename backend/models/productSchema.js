const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
})

// const productSchema = new mongoose.Schema({
//     productid: {type: String, required: true},
//     productname: {type: String, required: true},
//     prooductdesc: {type: String, required: true},
//     producttype: {type: Number, required: true},
//     productqty: {type: Number, required: true}
// })

const Product = mongoose.model('Product', productSchema)

module.exports = Product
