const express = require('express');
const { UserController } = require('../controllers/userController');
const { ProductController } = require('../controllers/productController');
const { PatternController } = require('../controllers/patternController');
const { RatingController } = require('../controllers/ratingController');
const { AuthenticationController } = require('../controllers/authenticationController');

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
const { createAuthMiddleware } = require("../middleware/authentication")
const authenticate = createAuthMiddleware(userRepository)

const { userSchemas } = require("../schemas/userSchema");
const { patternSchemas } = require("../schemas/patternSchema");
const { productSchemas } = require("../schemas/productSchema");
const { ratingSchemas } = require("../schemas/ratingSchema");
const { loginSchema } = require("../schemas/loginSchema");

const router = express.Router();

const userController = new UserController(userRepository);
const productController = new ProductController(productRepository, patternRepository);
const patternController = new PatternController(patternRepository);
const ratingController = new RatingController(ratingRepository, userRepository, productRepository);
const authenticationController = new AuthenticationController(userRepository);

router.post('/auth/login', validator(loginSchema.login), authenticationController.login.bind(authenticationController));

router.get('/users', authenticate, userController.getAllUsers.bind(userController));
router.post('/users', authenticate, validator(userSchemas.addUser), userController.addUser.bind(userController));
router.get('/users/:id', authenticate, userController.getUserById.bind(userController));
router.patch('/users/:id', authenticate, validator(userSchemas.modifyUser), userController.modifyUser.bind(userController));
router.delete('/users/:id', authenticate, userController.deleteUserById.bind(userController));

router.get('/products', productController.getAllProducts.bind(productController));
router.post('/products', authenticate, validator(productSchemas.addProduct), productController.addProduct.bind(productController));
router.get('/products/:id', productController.getProductById.bind(productController));
router.delete('/products/:id', authenticate, productController.deleteProductById.bind(productController));
router.patch('/products/:id', authenticate, validator(productSchemas.modifyProduct), productController.modifyProduct.bind(productController));

router.get('/products/:id/ratings', ratingController.getAllRatingsByProductId.bind(ratingController));
router.post('/products/:id/ratings', authenticate, validator(ratingSchemas.addRating), ratingController.addRating.bind(ratingController));
router.get('/products/:idp/ratings/:idu', ratingController.getRatingByUserIdAndProductId.bind(ratingController));
router.delete('/products/:idp/ratings/:idu', authenticate, ratingController.deleteRating.bind(ratingController));
router.patch('/products/:id/ratings', authenticate, validator(ratingSchemas.modifyRating), ratingController.modifyRating.bind(ratingController));

router.get('/patterns', patternController.getAllPatterns.bind(patternController));
router.post('/patterns', authenticate, validator(patternSchemas.addPattern), patternController.addPattern.bind(patternController));
router.get('/patterns/:id', patternController.getPatternById.bind(patternController));
router.delete('/patterns/:id', authenticate, patternController.deletePatternById.bind(patternController));
router.patch('/patterns/:id', authenticate, validator(patternSchemas.modifyPattern), patternController.modifyPattern.bind(patternController));

module.exports = router;
