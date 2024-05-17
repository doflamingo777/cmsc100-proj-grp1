const { registerUser, loginUser, getAllUsers, deleteUser } = require('./controller/usercontroller');
const { getAllProduct, addProduct, deleteProduct, updateProductQuantities } = require('./controller/shopping.js');
const { getAllOrderTransactions } = require('./controller/transactionController');

const router = (app) => {
    app.post('/register', registerUser);  
    app.post('/login', loginUser); 
    app.post('/deleteUser', deleteUser);      
    app.get('/users', getAllUsers);      
  
  //jonz
    app.get('/getAllProduct', getAllProduct);
    app.post('/addProduct', addProduct);
    app.post('/deleteProduct', deleteProduct);

  // lj
    app.get('/getAllOrderTransactions', getAllOrderTransactions);
    app.post('/updateProductQuantities', updateProductQuantities);
};

module.exports = router;  