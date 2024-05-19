const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Admin = require('../models/adminSchema.js');

const SECRET_KEY = process.env.SECRET_KEY;

//Registration
const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, username, phone, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userType = 'user';
        const newUser = new User({ firstname, lastname, username, phone, email, password: hashedPassword, userType: userType});
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: 'Error registering', details: error.message });
    }
};
//Show all Users
const getAllUsers = async (req, res) => {
	try {
	  const users = await User.find({});
	  res.send(users);
	} catch (error) {
	  console.error("Error fetching users:", error.message);
	  res.status(500).send("Internal Server Error");
	}
};

//find a product using it's object ID
const getAUser = async (req, res) => {
    try {
        const emailLoggedIn = req.query.email;

        // console.log( emailLoggedIn)
        const productDetails = await User.find({email: emailLoggedIn});
        // console.log(productDetails);
        res.send(productDetails);
    }catch(error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
}

const updateUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.body._id);
        console.log(req.body._id);
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        user.shopping_cart = req.body.shopping_cart;
    
        await user.save();
        res.status(200).send('User cart updated successfully');
      } catch (error) {
        console.error('Error updating user cart:', error);
        res.status(500).send('Internal server error');
      }
}



const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            user = await Admin.findOne({ email: req.body.email });
        }
        if (!user) {
            return res.status(401).send({ success: false, problem: 'User does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ success: false, problem: 'Wrong password' });
        }
        const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1hr'})
        return res.send({ success: true, userType: user.userType, token: token }); // Replace 'some-token' with actual token logic
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send({ success: false, problem: 'Internal Server Error' });
    }
};


const showAdmin = async (req, res) => {
	try {
	  const users = await Admin.find({});
	  res.send(users);
	} catch (error) {
	  console.error("Error fetching users:", error.message);
	  res.status(500).send("Internal Server Error");
	}
};

// delete User
const deleteUser = async (req, res) => {
    try{
        const deleted = await User.deleteOne({_id: req.body._id})
        // console.log(deleted)
    } catch(error){
        console.error("Error fetching users:", error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { loginUser, registerUser, getAllUsers, deleteUser, showAdmin, getAUser, updateUserCart };
