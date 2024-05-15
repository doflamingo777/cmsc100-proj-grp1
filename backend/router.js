const { registerUser, loginUser, getAllUsers, deleteUser } = require('./controller/usercontroller');
const { getAllProduct, addProduct } = require('./controller/shopping.js');

const router = (app) => {
    //riggs

    app.post('/register', registerUser);  
    app.post('/login', loginUser); 
    app.post('/deleteUser', deleteUser);      
    app.get('/users', getAllUsers);   
    //LJ
    
    //bryan
    
    
    //jonz
    app.get('/getAllProduct', getAllProduct);
    app.post('/addProduct', addProduct);
    
};

module.exports = router;