const product = require('../models/productSchema.js');
const cart = require('../models/cartSchema.js');
const Product = require('../models/productSchema.js');
const User = require('../models/userSchema.js');

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

//find a product using it's object ID
const getAProductForCarts = async (req, res) => {
    try {
        const productID = req.query.id;

        console.log('putanginasioldfjklasglksfga', productID)
        const productDetails = await cart.find({id: productID});
        // console.log(productDetails);
        res.send(productDetails);
    }catch(error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
}



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

    const { id, name, price, image, desc, qty, type, boughtQty } = req.body;
    console.log(id, name, price, image, desc, qty, type);

    const oncart = new cart({ id, name, price, image, desc, qty, type, boughtQty });
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
        type: newProduct.type,
    }});
    console.log(result);


    if (result._id) {
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
};
//edit a product in the oncarts
const editAProductForCarts = async (req, res) => {
    console.log(req.body);

    const { id, name, price, image, desc, qty, type, boughtQty } = req.body;

    const newProduct = new cart({ id, name, price, image, desc, qty, type, boughtQty });
    const result = await cart.updateOne({_id: req.body._id},{$set: {
        boughtQty: newProduct.boughtQty
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

// delete Product from cart
// const deleteProductCartasd = async (req, res) => {
//     try{
//         const deleted = await cart.deleteOne({_id: req.body.id})
//         console.log(deleted)
//         console.log("Delete Product")
//     } catch(error){
//         console.error("Error fetching product:", error.message);
//         res.status(500).send("Internal Server Error");
//     }
// }

const deleteProductCart = async (req, res) => {
    try {
      const { productId, user } = req.body;
  
      // Check if the user exists
      const userDocument = await User.findById(user._id);
      if (!userDocument) {
        return res.status(404).send('User not found');
      }
  
      // Filter out the product from the shopping_cart
      userDocument.shopping_cart = userDocument.shopping_cart.filter(
        (item) => item.productId.toString() !== productId
      );
        console.log(productId);
      // Save the updated user document
      await userDocument.save();
  
      res.status(200).send('Product removed from cart successfully');
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
      res.status(500).send("Internal Server Error");
    }
  };

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

const resetCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Clear the shopping_cart
      user.shopping_cart = [];
  
      // Save the updated user document
      await user.save();
  
      res.status(200).send('Shopping cart reset successfully');
    } catch (error) {
      console.error("Error resetting cart:", error.message);
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
    editAProduct,
    getAProductForCarts,
    editAProductForCarts,
    resetCart,
};