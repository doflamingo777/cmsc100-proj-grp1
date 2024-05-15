const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const SECRET_KEY = process.env.SECRET_KEY;

//Registration
const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, username, phone, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, username, phone, email, password: hashedPassword });
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

// get User
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body
        console.log(req.body)
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({error: 'Invalid credentials'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({error: 'Invalid credentials'})
        }
        const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1hr'})
        res.json({message: "Login successfull"})
    } catch(error){
        res.status(500).json({error: "Error signing in"})
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

module.exports = { loginUser, registerUser, getAllUsers, deleteUser };
