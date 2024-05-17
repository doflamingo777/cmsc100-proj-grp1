const { registerUser, loginUser, getAllUsers, deleteUser, showAdmin } = require('./controller/usercontroller');
const { getAllProduct, addProduct, deleteProduct, addNewProduct, getAllCheckOut, deleteProductCart, getAProduct, editAProduct } = require('./controller/shopping.js');

const { getAllOrderTransactions, acceptOrder } = require('./controller/transactionController');



const router = (app) => {
    app.post('/register', registerUser);  
    app.post('/login', loginUser); 
    app.post('/deleteUser', deleteUser);      
    app.get('/users', getAllUsers);      
    app.get('/showAdmin', showAdmin);
  
  //jonz
    app.get('/getAllProduct', getAllProduct);
    app.get('/getAProduct', getAProduct);
    app.get('/getAllCheckOut', getAllCheckOut);
    app.post('/deleteProductCart', deleteProductCart);
    app.post('/addProduct', addProduct);
    app.post('/deleteProduct', deleteProduct);
    app.post('/addNewProduct', addNewProduct);
    app.post('/editAProduct', editAProduct);

  // lj

    app.get('/getAllOrderTransactions', getAllOrderTransactions);
    app.post('/acceptOrder', acceptOrder);

};

module.exports = router;  