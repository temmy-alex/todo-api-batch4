const route = require('express').Router();
const controller = require('../controllers/user');
const checkAuth = require('../middlewares/checkAuth');

route.post('/login', controller.login);
route.post('/register', controller.register);

route.get('/', checkAuth, controller.userDetail)

module.exports = route;