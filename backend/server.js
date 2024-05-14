const dotenvResult = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router.js'); // Assuming you organize routes in separate files

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
router(app);

if (dotenvResult.error) {
    throw dotenvResult.error;
  }
// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is connected to port ${PORT} and connected to MongoDB`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
});
