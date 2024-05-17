const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    desc: {type: String, required: true},           //added desc
    type: {type: Number, required: true},           //added type    
    qty: {type: String, required: true},
})

// const cart = new mongoose.Schema({
//     productid: {type: String, required: true},
//     productname: {type: String, required: true},
//     prooductdesc: {type: String, required: true},
//     producttype: {type: Number, required: true},
//     productqty: {type: Number, required: true}
// })
//bbl drizzy
const oncart = mongoose.model('oncart', cartSchema)
// const onGod = mongoose.model('user', cartSchema).collection("shoppingcarts")

module.exports = oncart
