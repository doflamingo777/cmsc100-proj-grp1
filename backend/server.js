const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//connect to express server
const app = express();


//connect to mongodb
const dbURI = 'mongodb+srv://jngregorio1:bryan22@cluster5173.afcyvk6.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster5173'
mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(5173, () => {
        console.log('Server is connected to port 5173 and connected to MongoDB');
    });
})





//middlenames


//schema


//routes
