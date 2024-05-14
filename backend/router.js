const { registerUser, loginUser, getAllUsers } = require('./controller/usercontroller');

const router = (app) => {
    app.post('/register', registerUser);  
    app.post('/login', loginUser);       
    app.get('/users', getAllUsers);       
};

module.exports = router;
