const ordertransactions = require('../models/transactionSchema');
const Product = require('../models/productSchema');
const { v4: uuidv4 } = require('uuid');


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
        console.log("1st: ", transactionId);

        // Find the transaction using the transactionId from the request body
        const transaction = await ordertransactions.findOne({ productId: { $eq: transactionId } });
        console.log(transaction);

        // Find the product associated with the transaction's productId
        const productItem = await Product.findOne({ id: { $eq: transaction.productId } });
        console.log("Product item:");
        console.log("2nd: ", productItem);

        // Check if the product exists
        if (!productItem) {
            console.error('Product with ID not found:', transaction.productId);
            return res.status(404).send('Product not found');
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

        // Update transaction status to 'Completed' (1)
        const updateResult = await ordertransactions.updateOne(
            { _id: transaction._id },
            { $set: { orderStatus: 1 } }
        );

        console.log("Product item:");
        console.log(productItem);

        console.log('Transaction update result:', updateResult);

        // Send success response
        res.send('Order accepted and product updated');
    } catch (error) {
        console.error('Error accepting order:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
};

const groupTransactions = async (req, res) => {
    const { groupBy } = req.query; // Expected to be 'weekly', 'monthly', or 'yearly'

    let groupOperator;
    if (groupBy === 'weekly') {
        groupOperator = { $week: "$dateOrdered" };
    } else if (groupBy === 'monthly') {
        groupOperator = { $month: "$dateOrdered" };
    } else if (groupBy === 'yearly') {
        groupOperator = { $year: "$dateOrdered" };
    } else {
        return res.status(400).send('Invalid group by option');
    }

    try {
        const groupedData = await ordertransactions.aggregate([
            {
                $group: {
                    _id: {
                        period: groupOperator, // Use directly instead of wrapping in an object
                        productId: "$productId"
                    },
                    totalOrders: { $sum: 1 },
                    totalQuantity: { $sum: "$orderQuantity" }
                }
            },
            {
                $sort: { "_id.period": 1, "_id.productId": 1 } // Ensure sorting is adjusted as needed
            }
        ]);

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
        const { id } = req.body;

        // Generate random transaction ID
        const transactionId = generateTransactionId();

        // Create new order transaction
        const newOrderTransaction = new ordertransactions({
            transactionId: transactionId,
            productId: id,
            orderQuantity: 1,
            orderStatus: 1, // Assuming status 1 for a new order
            email: 'email@gmail.com',
            dateOrdered: new Date(),
            time: new Date().toLocaleTimeString()

        });

        // Save the order transaction to the database
        const check = await newOrderTransaction.save();
        console.log(check);

        // Respond with success message
        res.status(201).json({ message: 'Product added successfully', order: newOrderTransaction });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllOrderTransactions,
    acceptOrder,
    groupTransactions,

    addOrderTransac,
};