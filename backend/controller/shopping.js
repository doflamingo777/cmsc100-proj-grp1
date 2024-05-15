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
//bbl drizzy
// save new product
const addProduct = async (req, res) => {
    console.log("hatsUP")
    console.log(req.body)
    
	const { id, name, price, image } = req.body
	const oncart = new cart({id, name, price, image })
	await oncart.save()
    console.log(result);

	if (result._id) {
		res.send({ success: true })
	} else {
		res.send({ success: false })
	}
}

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

module.exports = {
    getAllProduct,
    addProduct,
    deleteProduct,
};