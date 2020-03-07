const express = require('express');
const Product = require('../models/product');
const authenticate = require('../authenticate');
const cors = require('./cors');

const productRouter = express.Router();

productRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    console.log('GET all products');
    Product.find()
    .then(products => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Product.create(req.body) //create new product document and save to db
    .then(products => {
        console.log('Product Created:', products);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /products');
    console.log('PUT operation not supported on /products');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Product.deleteMany() //delete all product documents
    .then(response => {
        console.log('All products deleted');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

//Filter products by category
productRouter.route('/:category')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    console.log(`GET products for ${req.params.category} category.`);
    if ((req.params.category).toLowerCase() === "all") {
        Product.find()
        .then(products => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        })
        .catch(err => next(err));
    } else {
        Product.find({category: (req.params.category).toLowerCase()})
        .then(products => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        })
        .catch(err => next(err));
    }   
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /products/:category');
    console.log('POST operation not supported on /products/:category');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /products/:category');
    console.log('PUT operation not supported on /products/:category');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /products/:category');
    console.log('DELETE operation not supported on /products/:category');
});

//Get specified product
productRouter.route('/item/:productId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    console.log(`GET product ID:  ${req.params.productId}.`);
    Product.findById(req.params.productId)
    .then(products => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /products/:productId');
    console.log('POST operation not supported on /products/:productId');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Product.findByIdAndUpdate(req.params.productId, {
        $set: req.body //$set: is mongo operater for setting value
    },  { new: true })
    .then(product => {
        console.log('Product Updated:', product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    console.log(`DELETE product ID:  ${req.params.productId}.`);
    Product.findByIdAndDelete(req.params.productId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = productRouter;