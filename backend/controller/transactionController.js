const ordertransactions = require('../models/transactionSchema');
const Product = require('../models/productSchema');

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

const acceptOrder = async (req, res) => {
    try {
        const { transactionId } = req.body;
        console.log(transactionId);
        const transaction = await ordertransactions.findOne({productId: {$eq: transactionId}});
        console.log(transaction);

        // if (transaction.orderStatus != 0) { // Check if not already processed
        //     return res.status(400).send('Order already processed');
        // }

        const productItem = await Product.findOne({ id: {$eq: transaction.productId} });
        console.log("Product item:");
        console.log(productItem);

        if (!productItem) {
            console.error('Product with ID not found:', transaction.productId);
            return res.status(404).send('Product not found');
        }

        // Update product quantities
        const updatedProduct = {
            soldqty: productItem.soldqty + transaction.orderQuantity,
            qty: productItem.qty - transaction.orderQuantity // Assuming 'qty' is the inventory count
        };

        console.log("Updated product:");
        console.log(updatedProduct);

        const test =  await Product.updateOne({ _id: productItem._id }, {
            $set: {
                soldqty: productItem.soldqty + transaction.orderQuantity,
                qty: productItem.qty - transaction.orderQuantity // Assuming 'qty' is the inventory count
            }
        });
        console.log("TEST")
        console.log(transaction);

        // Update transaction status to 'Completed' (1)
        const updatedTransaction = {
            orderStatus: 1
        };
        const updateResult = await transaction.updateOne({
            $set: { orderStatus: 1 }
        });
        console.log('Transaction update result:', updateResult);

        res.send('Order accepted and product updated');
    } catch (error) {
        console.error('Error accepting order:', error.response ? error.response.data : error.message);
    }
    
};

module.exports = {
    getAllOrderTransactions,
    acceptOrder,
};