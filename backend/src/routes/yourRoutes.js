const express = require('express');
const YourController = require('../controllers/yourController');

const router = express.Router();
const controller = new YourController(dao);

// router.post('/insert-data', controller.insertData.bind(controller));
router.get('/get-data', controller.getAllData.bind(controller));

module.exports = router;
