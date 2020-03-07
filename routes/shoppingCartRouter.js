const express = require('express');
const Cart = require('../models/cart');

const shoppingCartRouter = express.Router();

shoppingCartRouter.route('/:cartId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Get all shopping cart items for cart: ${req.params.cartId}`);
})
.post((req, res) => {
    res.end(`Create new shopping cart item for cart: ${req.params.cartId}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /shoppingCart/:cartId');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /shoppingCart/:cartId');
});

//Need to make sure this is working as designed
shoppingCartRouter.route('/cartId/:itemId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Get shopping cart item with ID: ${req.params.itemId}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /shoppingCart/cartId/:itemId');
})
.put((req, res) => {
    res.end(`Update shopping cart item with ID: ${req.params.itemId}`);
})
.delete((req, res) => {
    res.end(`Delete shopping cart item with ID: ${req.params.itemId}`);
});

module.exports = shoppingCartRouter;