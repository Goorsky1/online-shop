const express = require('express');
const { UserController } = require('../controllers/userController');
const { ProductController } = require('../controllers/productController');
const { PatternController } = require('../controllers/patternController');
const { RatingController } = require('../controllers/ratingController');

const { UserDao } = require("../daos/userDao");
const { ProductDao } = require("../daos/productDao");
const { PatternDao } = require("../daos/patternDao");
const { RatingDao } = require("../daos/ratingDao");
const db = require("../config")

const userDao = new UserDao(db);
const productDao = new ProductDao(db);
const patternDao = new PatternDao(db);
const ratingDao = new RatingDao(db);

const router = express.Router();

const userController = new UserController(userDao);
const productController = new ProductController(productDao);
const patternController = new PatternController(patternDao);
const ratingController = new RatingController(ratingDao);

router.get('/users', userController.getAllUsers.bind(userController));
router.post('/users', userController.addUser.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.patch('/users/:id', userController.modifyUser.bind(userController));
router.delete('/users/:id', userController.deleteUserById.bind(userController));

router.get('/products', productController.getAllProducts.bind(productController));
router.post('/products', productController.addProduct.bind(productController));
router.get('/products/:id', productController.getProductById.bind(productController));
router.delete('/products/:id', productController.deleteProductById.bind(productController));
router.patch('/products/:id', productController.modifyProduct.bind(productController));

router.get('/products/:id/ratings', ratingController.getAllRatingsByProductId.bind(ratingController));
router.post('/products/:id/ratings', ratingController.addRating.bind(ratingController));
router.get('/products/:idp/ratings/:idu', ratingController.getRatingByUserIdAndProductId.bind(ratingController));
router.delete('/products/:idp/ratings/:idu', ratingController.deleteRating.bind(ratingController));
router.patch('/products/:id/ratings', ratingController.modifyRating.bind(ratingController));

router.get('/patterns', patternController.getAllPatterns.bind(patternController));
router.post('/patterns', patternController.addPattern.bind(patternController));
router.get('/patterns/:id', patternController.getPatternById.bind(patternController));
router.delete('/patterns/:id', patternController.deletePatternById.bind(patternController));
router.patch('/patterns/:id', patternController.modifyPattern.bind(patternController));

module.exports = router;
