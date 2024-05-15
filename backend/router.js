const { registerUser, loginUser, getAllUsers, deleteUser } = require('./controller/usercontroller');

const router = (app) => {
    app.post('/register', registerUser);  
    app.post('/login', loginUser); 
    app.post('/deleteUser', deleteUser);      
    app.get('/users', getAllUsers);       
};

module.exports = router;
