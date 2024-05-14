
const user = require('./models/userSchema');

const getUser = async (req, res) => {
    try {
        const userDetails = await user.find(); // Assuming user.find() returns user details
        console.log(userDetails);
        res.send(userDetails); // Send user details as response
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    register,
    login,
    getUser
};
