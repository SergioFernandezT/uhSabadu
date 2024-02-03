// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/register', mainController.register);
router.get('/login', mainController.login);
router.get('/productDetail', mainController.productDetail);
router.get('/productCart', mainController.productCart);

// router.???('/search', mainController.search); 

module.exports = router;
