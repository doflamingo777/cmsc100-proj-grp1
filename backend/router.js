const { getUser  } = require('./controller/AdminController/admincontroller.js');
const { getAllProduct, addProduct } = require('./controller/UserController/shopping.js');

const router = (app) => {
    //riggs
    app.get('/getUser', getUser);


    //LJ
    
    //bryan
    
    
    //jonz
    app.get('/getAllProduct', getAllProduct);
    app.post('/addProduct', addProduct);
    
};

module.exports = router;