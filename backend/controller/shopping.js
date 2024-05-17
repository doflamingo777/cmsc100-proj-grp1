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

//find a product using it's object ID
const getAProduct = async (req, res) => {
    try {
        const objectId = req.query.id;
        const productDetails = await product.find({_id: objectId});
        // console.log(productDetails);
        res.send(productDetails);
    }catch(error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
}



const getAllCheckOut = async (req, res) => {
    try {
        const userEmail = req.user._id; // get the user's id
        const userCart = await cart.findOne({ user: user_id }); // kunin yung current on cart nya

        if (!userCart) {
            return res.status(404).send("User's cart not found");
        }
        // extract product id and quantity
        const productsInCart = userCart.products.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        // Update the user's shopping_cart field with the product IDs and quantities
        await User.findByIdAndUpdate(user_id, { shopping_cart: productsInCart }, { new: true });

        // Send response
        res.json(productsInCart);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
};
//bbl drizzy
// save new product
// const addProduct = async (req, res) => {
//     console.log("hatsUP");
//     console.log(req.body);

//     const { id, name, price, image, desc, qty, type } = req.body;
//     console.log(id, name, price, image, desc, qty, type);

//     const oncart = new cart({ id, name, price, image, desc, qty, type });
//     const result = await oncart.save();
//     console.log(result);

//     if (result._id) {
//         res.send({ success: true });
//     } else {
//         res.send({ success: false });
//     }
// };

const addProduct = async (req, res) => {
    try {
        // Assuming you have a middleware that extracts the user information after authentication
        const user_id = req.body._id;
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        console.log(user_id)
        // Extract product details from request body
        const { id, name, price, image, desc, qty, type } = req.body;

        // Find the user's cart or create one if it doesn't exist
        let userCart = await oncarts.findOne({ user: user_id });
        if (!userCart) {
            userCart = new cart({ user: user_id, products: [] });
        }

        // Add the product to the user's cart
        userCart.cart.push({ id, name, price, image, desc, qty, type });

        // Save the updated cart
        await userCart.save();

        res.send({ success: true });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal Server Error");
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

const editAProduct = async (req, res) => {
    console.log(req.body);

    const { id, name, price, image, desc, qty, type } = req.body;

    const newProduct = new product({ id, name, price, image, desc, qty, type });
    const result = await Product.updateOne({_id: req.body._id},{$set: {
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        desc: newProduct.desc,
        qty: newProduct.qty,
    }});
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
    getAllCheckOut,
    getAProduct,
    editAProduct
};