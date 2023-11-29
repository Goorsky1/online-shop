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

const { createAuthorizationMiddleware } = require("../middleware/authorization")
const authorizeClient = createAuthorizationMiddleware(['client'])
const authorizeWorker = createAuthorizationMiddleware(['worker'])
const authorizeClientOrWorker = createAuthorizationMiddleware(['worker', 'client'])

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

// AUTH
router.post('/auth/login', validator(loginSchema.login), authenticationController.login.bind(authenticationController));
router.get('/auth/refresh', authenticationController.refresh.bind(authenticationController));

// USERS
router.get('/users', authenticate, authorizeWorker, userController.getAllUsers.bind(userController));
router.post('/users', validator(userSchemas.addUser), userController.addUser.bind(userController));

router.get('/users/:id', authenticate, authorizeClientOrWorker, userController.getUserById.bind(userController));
router.patch('/users/:id', authenticate, authorizeClientOrWorker, validator(userSchemas.modifyUser), userController.modifyUser.bind(userController));
router.delete('/users/:id', authenticate, authorizeClientOrWorker, userController.deleteUserById.bind(userController));

// PRODUCTS
router.get('/products', productController.getAllProducts.bind(productController));
router.post('/products', authenticate, authorizeWorker, validator(productSchemas.addProduct), productController.addProduct.bind(productController));
router.post('/products/checkout', authenticate, authorizeClientOrWorker, validator(productSchemas.processCheckout), productController.processCheckout.bind(productController));

router.get('/products/:id', productController.getProductById.bind(productController));
router.patch('/products/:id', authenticate, authorizeWorker, validator(productSchemas.modifyProduct), productController.modifyProduct.bind(productController));
router.delete('/products/:id', authenticate, authorizeWorker, productController.deleteProductById.bind(productController));

router.get('/products/:id/ratings', ratingController.getAllRatingsByProductId.bind(ratingController));
router.post('/products/:id/ratings', authenticate, authorizeClientOrWorker, validator(ratingSchemas.addRating), ratingController.addRating.bind(ratingController));
router.patch('/products/:id/ratings', authenticate, authorizeClientOrWorker, validator(ratingSchemas.modifyRating), ratingController.modifyRating.bind(ratingController));

router.get('/products/:idp/ratings/:idu', ratingController.getRatingByUserIdAndProductId.bind(ratingController));
router.delete('/products/:idp/ratings/:idu', authenticate, authorizeClientOrWorker, ratingController.deleteRating.bind(ratingController));

// PATTERNS
router.get('/patterns', patternController.getAllPatterns.bind(patternController));
router.post('/patterns', authenticate, authorizeWorker, validator(patternSchemas.addPattern), patternController.addPattern.bind(patternController));

router.get('/patterns/:id', patternController.getPatternById.bind(patternController));
router.patch('/patterns/:id', authenticate, authorizeWorker, validator(patternSchemas.modifyPattern), patternController.modifyPattern.bind(patternController));
router.delete('/patterns/:id', authenticate, authorizeWorker, patternController.deletePatternById.bind(patternController));

module.exports = router;
