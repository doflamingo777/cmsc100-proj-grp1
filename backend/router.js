const { login, register, getUser } = require('./controller.js');

const router = (app) => {
    app.get('/getUser', getUser);
    app.post('/login', login);
    app.post('/register', register);
};

module.exports = router;