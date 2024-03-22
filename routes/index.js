const route = require('express').Router()
const todoRoute = require('./todo');
const userRoute = require('./user');
const articleRoute = require('./article')

route.use('/users', userRoute);
route.use('/todo', todoRoute);
route.use('/articles', articleRoute);

module.exports = route