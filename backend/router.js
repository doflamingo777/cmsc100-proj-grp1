const { registerUser, loginUser, getAllUsers, deleteUser, showAdmin, getAUser, updateUserCart, updateUserProfile, getUserPurchaseHistory, getAUserInfo } = require('./controller/usercontroller');
const { getAllProduct, addProduct, deleteProduct, addNewProduct, getAllCheckOut, deleteProductCart, getAProduct, editAProduct, getAProductForCarts, editAProductForCarts, resetCart } = require('./controller/shopping.js');
const { getAllOrderTransactions, acceptOrder, rejectOrder, groupTransactions, addOrderTransac, cancelOrder } = require('./controller/transactionController');



const router = (app) => {
    app.post('/register', registerUser);  
    app.post('/login', loginUser); 
    app.post('/deleteUser', deleteUser);      
    app.get('/users', getAllUsers);      
    app.get('/showAdmin', showAdmin);
    app.get('/getAUser', getAUser); 
    app.post('/updateUserCart', updateUserCart)   
    app.post('/updateProfile', updateUserProfile);
    app.get('/purchaseHistory', getUserPurchaseHistory);  
    app.get('/getAUserInfo', getAUserInfo);
    
  
  //jonz
    app.get('/getAllProduct', getAllProduct);
    app.get('/getAProduct', getAProduct);
    app.get('/getAProductForCarts', getAProductForCarts);
    app.get('/getAllCheckOut', getAllCheckOut);
    app.post('/deleteProductCart', deleteProductCart);
    app.post('/addProduct', addProduct);
    app.post('/deleteProduct', deleteProduct);
    app.post('/addNewProduct', addNewProduct);
    app.post('/editAProduct', editAProduct);
    app.post('/editAProductForCarts', editAProductForCarts);

  // lj
    app.get('/getAllOrderTransactions', getAllOrderTransactions);
    app.post('/acceptOrder', acceptOrder);
    app.post('/rejectOrder', rejectOrder);
    app.get('/group-transactions', groupTransactions);
    app.post('/addOrderTransac', addOrderTransac);
    app.post('/resetCart', resetCart)
    app.post('/cancelOrder', cancelOrder)
    
    // app.get('/getUserTrans', getUserOrderTransactions);
};

module.exports = router;  