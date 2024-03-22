const route = require('express').Router()
const controller = require('../controllers/article')

route.get('/health-check', controller.healthCheck);
route.get('/', controller.index)

module.exports = route