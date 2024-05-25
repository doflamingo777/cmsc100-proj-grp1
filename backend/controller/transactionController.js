const ordertransactions = require('../models/transactionSchema');
const Product = require('../models/productSchema');
const { v4: uuidv4 } = require('uuid');
const cart = require('../models/cartSchema.js');


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
        console.log("Transaction ID: ", transactionId);

        const transaction = await ordertransactions.findOne({ transactionId: { $eq: transactionId } });
        console.log("Transaction: ", transaction);

        if (!transaction) {
            console.error('Transaction not found with ID:', transactionId);
            return res.status(404).send('Transaction not found');
        }

        // Find the product associated with the transaction's productId
        const productItem = await Product.findOne({ id: transaction.productId });
        console.log("Product item:");
        console.log("2nd: ", productItem);

        // Check if the product exists
        if (!productItem) {
            console.error('Product with ID not found:', transaction.productId);
            return res.status(404).send('Product not found');
        }

        // Check if the product quantity is 0 or less
        if (productItem.qty <= 0) {
            console.error('Product is out of stock, cancelling the transaction:', transaction.productId);
            
            // Update transaction status to 'Cancelled' (assuming status 2 represents 'Cancelled')
            await ordertransactions.updateOne(
                { _id: transaction._id },
                { $set: { orderStatus: 2 } }
            );

            return res.status(200).json({ message: 'This order transaction will be cancelled since the product is no longer available', cancelled: true });
        }

        // Calculate the updated product quantities and sales
        const newSoldQty = productItem.soldqty + transaction.orderQuantity;
        const newQty = productItem.qty - transaction.orderQuantity;
        const newSales = newSoldQty * productItem.price;

        // Update the product with new sold quantity, quantity, and sales
        const updatedProduct = {
            soldqty: newSoldQty,
            qty: newQty,
            sales: newSales
        };

        console.log("Updated product:");
        console.log("3rd: ", updatedProduct);

        // Update the product in the database
        await Product.updateOne(
            { _id: productItem._id },
            {
                $set: updatedProduct
            }
        );

        // Update transaction status to 'Completed' (assuming status 1 represents 'Completed')
        const updateResult = await ordertransactions.updateOne(
            { _id: transaction._id },
            { $set: { orderStatus: 1 } }
        );

        console.log("Product item:");
        console.log(productItem);

        console.log('Transaction update result:', updateResult);

        // Send success response
        res.status(200).json({ message: 'Order accepted and product updated', cancelled: false });
    } catch (error) {
        console.error('Error accepting order:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { transactionId } = req.body;
        console.log("Transaction ID for cancellation: ", transactionId);

        // Find the transaction using the transactionId
        const transaction = await ordertransactions.findOne({ transactionId: transactionId });
        console.log("Transaction to cancel: ", transaction);

        if (!transaction) {
            console.error('Transaction not found:', transactionId);
            return res.status(404).send('Transaction not found');
        }

        // Update transaction status to 'Canceled' (2)
        const updateResult = await ordertransactions.updateOne(
            { _id: transaction._id },
            { $set: { orderStatus: 3 } }
        );

        console.log('Transaction update result:', updateResult);

        // Send success response
        res.send('Order cancelled and marked as cancelled by customer');
    } catch (error) {
        console.error('Error rejecting order:', error);
        res.status(500).send('Internal Server Error');
    }
};

const rejectOrder = async (req, res) => {
    try {
        const { transactionId } = req.body;
        console.log("Transaction ID for rejection: ", transactionId);

        // Find the transaction using the transactionId
        const transaction = await ordertransactions.findOne({ transactionId: transactionId });
        console.log("Transaction to reject: ", transaction);

        if (!transaction) {
            console.error('Transaction not found:', transactionId);
            return res.status(404).send('Transaction not found');
        }

        // Update transaction status to 'Canceled' (2)
        const updateResult = await ordertransactions.updateOne(
            { _id: transaction._id },
            { $set: { orderStatus: 2 } }
        );

        console.log('Transaction update result:', updateResult);

        // Send success response
        res.send('Order rejected and marked as rejected');
    } catch (error) {
        console.error('Error rejecting order:', error);
        res.status(500).send('Internal Server Error');
    }
};


const groupTransactions = async (req, res) => {
    const { groupBy } = req.query;

    let groupOperator;
    if (groupBy === 'weekly') {
        groupOperator = { $concat: ["Week ", { $toString: { $week: "$dateOrdered" } }, "th of ", { $toString: { $year: "$dateOrdered" } }] };
    } else if (groupBy === 'monthly') {
        groupOperator = { $concat: [{ $arrayElemAt: [["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], { $subtract: [{ $month: "$dateOrdered" }, 1] }] }, " of ", { $toString: { $year: "$dateOrdered" } }] };
    } else if (groupBy === 'yearly') {
        groupOperator = { $toString: { $year: "$dateOrdered" } };
    } else {
        return res.status(400).send('Invalid group by option');
    }

    try {
        const groupedData = await ordertransactions.aggregate([
            {
                $match: {
                    orderStatus: 1
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "id",
                    as: "productDetails"
                }
            },
            {
                $unwind: {
                    path: "$productDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    "computedSales": {
                        $multiply: ["$orderQuantity", "$productDetails.price"]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        period: groupOperator
                    },
                    totalOrders: { $sum: "$orderQuantity" },
                    totalSales: { $sum: "$computedSales" },
                    productIds: { $addToSet: "$productId" }
                }
            },
            {
                $project: {
                    period: "$_id.period",
                    productIds: 1,
                    totalOrders: 1,
                    totalSales: 1
                }
            },
            {
                $sort: { "period": 1 }
            }
        ]);

        console.log('Grouped Data:', JSON.stringify(groupedData, null, 2));
        res.json(groupedData);
    } catch (error) {
        console.error('Error in grouping transactions:', error);
        res.status(500).send('Internal Server Error');
    }
};





// Function to generate a random 2-character transaction ID
const generateTransactionId = () => {
    const random = uuidv4().replace(/-/g, '');
    const letters = random.replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase();
    const numbers = random.replace(/[^0-9]/g, '').substring(0, 3)
    //adds the P letter at the start to indicate that it's and id for products
    const finalRandomizeID = `T${letters}${numbers}`; 
    return finalRandomizeID;
};

// Example usage:
console.log(generateTransactionId()); // e.g., "aZ", "4k", "X2"


const addOrderTransac = async (req, res) => {
    try {
        const { id, quantity, mail } = req.body;
        // Generate random transaction ID
        const transactionId = generateTransactionId();

        // Retrieve product details from the database using the product ID from the request body
        console.log('Product ID: ', id);
        const productDetails = await Product.findOne({ id });

        if (!productDetails) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Calculate sales
        const sales = productDetails.price * quantity;
        console.log("Sales: ", sales);

        // Create new order transaction
        const newOrderTransaction = new ordertransactions({
            transactionId,
            productId: id,
            orderQuantity: quantity,
            orderStatus: 0,
            email: mail,
            dateOrdered: new Date(),
            time: new Date().toLocaleTimeString(),
            sales,
        });

        // Save the order transaction to the database
        const savedTransaction = await newOrderTransaction.save();

        // Respond with success message
        res.status(201).json({ message: 'Product added successfully', order: savedTransaction });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const getUserOrderTransactions = async (req, res) => {
//     try {
//         const orderTransactionDetails = await ordertransactions.find({}); 
//         console.log(orderTransactionDetails);
//         res.send(orderTransactionDetails); 
//     } catch (error) {
//         console.error("Error fetching order transaction details:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

module.exports = {
    getAllOrderTransactions,
    acceptOrder,
    rejectOrder,
    groupTransactions,
    addOrderTransac,
    cancelOrder,
    // getUserOrderTransactions,
};