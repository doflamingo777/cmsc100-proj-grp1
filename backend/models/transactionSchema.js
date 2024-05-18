const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transactionId: {type: String, required: true},
    productId: {type: String, required: true},
    orderQuantity: {type: Number, required: true},
    orderStatus: {type: Number, required: true},
    email: {type: String, required: true},           
    dateOrdered: {type: Date, required: true, default: Date.now},             
    time: {type: String, required: true, default: () => new Date().toLocaleTimeString()},          
})


const OrderTransactions = mongoose.model('ordertransactions', transactionSchema)

module.exports = OrderTransactions
