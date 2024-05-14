const router = require("./router.js")
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');

const SECRET_KEY = 'secretkey';

//connect to express server
const app = express();
app.use(cors());
router(app);
//connect to mongodb
//create a .env
            //  mongodb+srv://jngregorio1:bryan22@cluster5173.afcyvk6.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster5173
const dbURI = 'mongodb+srv://jngregorio1:bryan22@cluster5173.afcyvk6.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster5173'
mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(3000, () => {
        console.log('Server is connected to port 3000 and connected to MongoDB');
    });
})





//middleware
app.use(bodyParser.json())
app.use(cors())



//routes
//USER REGISTER
//POST REGISER
app.post('/register', async (req, res) => {
    try {
        const {firstname, lastname, username, phone, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstname, lastname, username, phone, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'Registration successful'});
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({error: 'Error registering', details: error.message});
    }
});

//GET REGISTERED USERS
//DONT RETURN PASSWORD AND NOT ALL USERS
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    }catch (error) {
        res.status(500).json({error: 'Error unable to get users'})
    }
})

//GET LOGIN USERS
app.post('/login', async (req, res) => {
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
})


//Create
//Read
