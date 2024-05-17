const product = require('../models/productSchema.js');
const cart = require('../models/cartSchema.js');
const Product = require('../models/productSchema.js');

const getAllProduct = async (req, res) => {
    try {
        const productDetails = await product.find(); // Assuming product.find() returns product details
        // console.log(productDetails);
        res.send(productDetails); // Send product details as response
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllCheckOut = async (req, res) => {
    try {
        const productDetails = await cart.find(); // Assuming product.find() returns product details
        // console.log(productDetails);
        res.send(productDetails); // Send product details as response
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
};
//bbl drizzy
// save new product
const addProduct = async (req, res) => {
    console.log("hatsUP");
    console.log(req.body);

    const { id, name, price, image, desc, qty, type } = req.body;
    console.log(id, name, price, image, desc, qty, type);

    const oncart = new cart({ id, name, price, image, desc, qty, type });
    const result = await oncart.save();
    console.log(result);

    if (result._id) {
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
};

// save new product to products collection
const addNewProduct = async (req, res) => {
    console.log("hatsUP");
    console.log(req.body);

    const { id, name, price, image, desc, qty, type } = req.body;
    console.log(id, name, price, image, desc, qty, type);

    const newProduct = new product({ id, name, price, image, desc, qty, type });
    const result = await newProduct.save();
    console.log(result);

    if (result._id) {
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
};

// delete Product
const deleteProduct = async (req, res) => {
    try{
        const deleted = await Product.deleteOne({_id: req.body._id})
        // console.log(deleted)
    } catch(error){
        console.error("Error fetching product:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

// delete Product
const deleteProductCart = async (req, res) => {
    try{
        const deleted = await cart.deleteOne({_id: req.body._id})
        console.log(deleted)
        console.log("Delete Product")
    } catch(error){
        console.error("Error fetching product:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

const updateProductQuantities = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Update quantities
        product.soldqty += 1;
        product.qty -= 1;

        await product.save();

        res.send(product);
    } catch (error) {
        console.error("Error updating product quantities:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getAllProduct,
    addProduct,
    deleteProduct,
    deleteProductCart,
    updateProductQuantities,
    addNewProduct,
    getAllCheckOut
};