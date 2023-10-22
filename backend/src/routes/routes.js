const express = require('express');
const { UserController } = require('../controllers/userController');
const { ProductController } = require('../controllers/productController');
const { PatternController } = require('../controllers/patternController');
const { RatingController } = require('../controllers/ratingController');

const { UserRepository } = require("../repository/userRepository");
const { ProductRepository } = require("../repository/productRepository");
const { PatternRepository } = require("../repository/patternRepository");
const { RatingRepository } = require("../repository/ratingRepository");
const db = require("../config")

const userRepository = new UserRepository(db);
const productRepository = new ProductRepository(db);
const patternRepository = new PatternRepository(db);
const ratingRepository = new RatingRepository(db);

const { validator } = require("../middleware/validator")
const { userSchemas } = require("../schemas/userSchema");
const { patternSchemas } = require("../schemas/patternSchema");
const { productSchemas } = require("../schemas/productSchema");
const { ratingSchemas } = require("../schemas/ratingSchema");

const router = express.Router();

const userController = new UserController(userRepository);
const productController = new ProductController(productRepository, patternRepository);
const patternController = new PatternController(patternRepository);
const ratingController = new RatingController(ratingRepository, userRepository, productRepository);

router.get('/users', userController.getAllUsers.bind(userController));
router.post('/users', validator(userSchemas.addUser), userController.addUser.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.patch('/users/:id', validator(userSchemas.modifyUser), userController.modifyUser.bind(userController));
router.delete('/users/:id', userController.deleteUserById.bind(userController));

router.get('/products', productController.getAllProducts.bind(productController));
router.post('/products', validator(productSchemas.addProduct), productController.addProduct.bind(productController));
router.get('/products/:id', productController.getProductById.bind(productController));
router.delete('/products/:id', productController.deleteProductById.bind(productController));
router.patch('/products/:id', validator(productSchemas.modifyProduct), productController.modifyProduct.bind(productController));

router.get('/products/:id/ratings', ratingController.getAllRatingsByProductId.bind(ratingController));
router.post('/products/:id/ratings', validator(ratingSchemas.addRating), ratingController.addRating.bind(ratingController));
router.get('/products/:idp/ratings/:idu', ratingController.getRatingByUserIdAndProductId.bind(ratingController));
router.delete('/products/:idp/ratings/:idu', ratingController.deleteRating.bind(ratingController));
router.patch('/products/:id/ratings', validator(ratingSchemas.modifyRating), ratingController.modifyRating.bind(ratingController));

router.get('/patterns', patternController.getAllPatterns.bind(patternController));
router.post('/patterns', validator(patternSchemas.addPattern), patternController.addPattern.bind(patternController));
router.get('/patterns/:id', patternController.getPatternById.bind(patternController));
router.delete('/patterns/:id', patternController.deletePatternById.bind(patternController));
router.patch('/patterns/:id', validator(patternSchemas.modifyPattern), patternController.modifyPattern.bind(patternController));

module.exports = router;