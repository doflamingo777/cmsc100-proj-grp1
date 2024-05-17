const { registerUser, loginUser, getAllUsers, deleteUser, showAdmin } = require('./controller/usercontroller');
const { getAllProduct, addProduct, deleteProduct } = require('./controller/shopping.js');

//const { getAllOrderTransactions } = require('./controller/transactionController');



const router = (app) => {
    app.post('/register', registerUser);  
    app.post('/login', loginUser); 
    app.post('/deleteUser', deleteUser);      
    app.get('/users', getAllUsers);      
    app.get('/showAdmin', showAdmin);
  
  //jonz
    app.get('/getAllProduct', getAllProduct);
    app.post('/addProduct', addProduct);
    app.post('/deleteProduct', deleteProduct);

  // lj

    //app.get('/getAllOrderTransactions', getAllOrderTransactions);

};

module.exports = router;  