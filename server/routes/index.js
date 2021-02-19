const routes = require('express').Router()
const Controller = require('../controllers')

routes.get('/products',Controller.getProducts)
routes.get('/products/:id',Controller.getProductById)

routes.post('/products',Controller.postProducts)

routes.put('/products/:id',Controller.putProduct)
routes.delete('/products/:id',Controller.deleteProduct)

module.exports = routes