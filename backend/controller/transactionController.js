const ordertransactions = require('../models/transactionSchema');

const getAllOrderTransactions = async (req, res) => {
    try {
        const orderTransactionDetails = await ordertransactions.find({}); 
        console.log(orderTransactionDetails);
        res.send(orderTransactionDetails); 
    } catch (error) {
        console.error("Error fetching order transaction details:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getAllOrderTransactions,
};